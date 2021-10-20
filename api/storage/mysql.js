const mysql = require('mysql2');
const fs = require('fs');
const config = require('../../config.json');

var connection;
handleDisconnect();
function handleDisconnect() { // credits: https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
  connection = mysql.createConnection(config.storage.mysql); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('Error when connecting to DB:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
    console.log(`[SQL] Connected to MySQL Database!`)
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('[SQL] There has been an error with the SQL connection. Trying to reconnect...');
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

connection.query('CREATE TABLE IF NOT EXISTS users (username varchar(255), cape varchar(255), item varchar(255), CONSTRAINT thatthang UNIQUE (username))',
  function(err, results, fields) {
    if (results) {
      console.log(`[SQL] Users Database Active`)
    }
  });

connection.query('CREATE TABLE IF NOT EXISTS discord (id varchar(255), username varchar(255), CONSTRAINT discordthang UNIQUE (id))',
  function(err, results, fields) {
    if (results) {
      console.log(`[SQL] Link Database Active`)
    }
  });

function getUser(username, cb) {
  connection.query('SELECT * from users WHERE `username` = ?', [username], 
  function(err, results, fields) {
    if (results && results[0]) return cb(results[0])
    cb({cape: "None", item: "None"})
  });
}

function getCape(username, cb) {
  connection.query('SELECT cape from users WHERE `username` = ?', [username], 
  function(err, results, fields) {
    if (results && results[0]) return cb(results[0].cape)
    cb(`None`)
  });
}

function getCapeUrl(username, cb) {
  connection.query('SELECT cape from users WHERE `username` = ?', [username], 
  function(err, results, fields) {
    if (results && results[0] && results[0].cape === "custom") return cb(`/assets/capes/${username}.png`)
    if (results && results[0] && results[0].cape) return cb(`/assets/capes/${results[0].cape}.png`)
    cb(`http://107.182.233.85/capes/${username}.png`)
  });
}

function getItem(username, cb) {
  connection.query('SELECT item from users WHERE `username` = ?', [username], 
  function(err, results, fields) {
    if (results && results[0] && results[0].item) return cb(results[0].item)
    cb(null)
  });
}

function getUserCfg(username, cb) {
  connection.query('SELECT item from users WHERE `username` = ?', [username], 
  function(err, results, fields) {
    let obj = {items:[]}
    if (!results[0] || !results[0].item) return cb(obj);
    obj.items.push({
        "type": "custom",
        "model": "assets/items/"+results[0].item+"/model.cfg",
        "texture": "assets/items/"+results[0].item+"/texture.png",
        "active": "true"
    })
    cb(obj);
  });
}

function getLink(id, cb) {
  connection.query('SELECT username from discord WHERE `id` = ?', [id], 
  function(err, results, fields) {
    if (results && results[0]) return cb(results[0].username)
    cb(null)
  });
}

function getLinkFromUser(username, cb) {
  connection.query('SELECT id from discord WHERE `username` = ?', [username], 
  function(err, results, fields) {
    if (results && results[0]) return cb(results[0].id)
    cb(null)
  });
}

// set

function setCape(username, cape, cb) {
  if (cape !== "custom" && cape.toLowerCase() !== "none" && !fs.existsSync(`./api/assets/capes/${cape}.png`)) return cb(false);
  if (cape.toLowerCase() === "none") {
    cape = null;
  }
  connection.query('INSERT INTO users (`username`, `cape`, `item`) VALUES (?,?,?) ON DUPLICATE KEY UPDATE `cape` = VALUES(cape)', [username, cape, null],
  function(err, results, fields) {
    if (err) {
      console.log(`[SQL] Error on setCape: ` + err)
      return cb(false)
    }
    return cb(true)
  });
}

function setItem(username, item, cb) {
  if (item.toLowerCase() !== "none" && !fs.existsSync(`./api/assets/items/${item}/model.cfg`)) return cb(false)
  if (item.toLowerCase() === "none") {
    item = null;
  }
  connection.query('INSERT INTO users (`username`, `cape`, `item`) VALUES (?,?,?) ON DUPLICATE KEY UPDATE `item` = VALUES(item)', [username, null, item],
  function(err, results, fields) {
    if (err) {
      console.log(`[SQL] Error on setItem: ` + err)
      return cb(false)
    }
    return cb(true)
  });
}

function setLink(id, username, cb) {
  connection.query('INSERT INTO discord (`id`, `username`) VALUES (?,?) ON DUPLICATE KEY UPDATE `username` = VALUES(username)', [id, username], 
  function(err, results, fields) {
    if (err) {
      console.log(`[SQL] Error on setLink: ` + err)
      return cb(false)
    }
    return cb(true)
  });
}

if (config.storage.mysql_anti_idle === true) {
  setInterval(async function () {
    connection.query('SELECT * from users', ()=>{});
  }, 30000)
}


module.exports = {
  getUser: getUser,
  getCape: getCape,
  getCapeUrl: getCapeUrl,
  getItem: getItem,
  getUserCfg: getUserCfg,
  getLink: getLink,
  getLinkFromUser: getLinkFromUser,
  setCape: setCape,
  setItem: setItem,
  setLink: setLink,
}