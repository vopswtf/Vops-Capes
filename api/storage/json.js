const fs = require('fs')

function getUser(username, cb) {
    let userData = JSON.parse(fs.readFileSync('./api/users.json'));
    if (!userData.users[username]) return cb({cape: "None", item: "None"});
    userData.users[username].username = username
    return cb(userData.users[username]);
}

// get

function getCape(username, cb) {
    let userData = JSON.parse(fs.readFileSync('./api/users.json'));
    if (!userData.users[username] || !userData.users[username].cape) return cb(`None`);
    return cb(userData.users[username].cape);
}

function getCapeUrl(username, cb) {
    let userData = JSON.parse(fs.readFileSync('./api/users.json'));
    if (!userData.users[username] || !userData.users[username].cape) return cb(`http://107.182.233.85/capes/${username}`);
    if (userData.users[username] && userData.users[username].cape === "custom") return cb(`/assets/capes/${username}.png`);
    return cb(`/assets/capes/${userData.users[username]?.cape || "what"}.png`);
}

function getItem(username, cb) {
    let userData = JSON.parse(fs.readFileSync('./api/users.json'));
    if (!userData.users[username] || !userData.users[username].item) return cb(`None`);
    return cb(userData.users[username]?.item);
}

function getUserCfg(username, cb) {
    let userData = JSON.parse(fs.readFileSync('./api/users.json'));
    let obj = {items:[]}
    if (!userData.users[username] || !userData.users[username].item) return cb(obj);
    obj.items = {
        "type": "custom",
        "model": "assets/items/"+userData.users[username]?.item+"/model.cfg",
        "texture": "assets/items/"+userData.users[username]?.item+"/texture.png",
        "active": "true"
    }
    cb(obj);
}

function getLink(id, cb) {
    let userData = JSON.parse(fs.readFileSync('./api/users.json'));
    return cb(userData.discordLink[id]);
}

function getLinkFromUser(username, cb) {
    let userData = JSON.parse(fs.readFileSync('./api/users.json'));
    let discordId;
    for (var key in userData.discordLink) {
      if (userData.discordLink[key] === username) {
        discordId = key;
      }
    }
    return cb(discordId);
}

// set

function setCape(username, cape, cb) {
    let userData = JSON.parse(fs.readFileSync('./api/users.json'));
    if (!userData.users[username]) {
      userData.users[username] = {
        "cape": null,
        "item": null
      }
    }
    if (!fs.existsSync(`./api/assets/capes/${cape}.png`)) return cb(false);
    userData.users[username].cape = cape
    fs.writeFileSync('./api/users.json', JSON.stringify(userData, null, 2))
    return cb(true)
}

function setItem(username, item, cb) {
    let userData = JSON.parse(fs.readFileSync('./api/users.json'));
    if (!userData.users[username]) {
      userData.users[username] = {
        "cape": null,
        "item": null
      }
    }
    if (!fs.existsSync(`./api/assets/items/${item}/model.cfg`)) return cb(false)
    userData.users[username].item = item
    fs.writeFileSync('./api/users.json', JSON.stringify(userData, null, 2))
    return cb(true)
}

function setLink(id, username, cb) {
    let userData = JSON.parse(fs.readFileSync('./api/users.json'));
    userData.discordLink[id] = username;
    fs.writeFileSync('./api/users.json', JSON.stringify(userData, null, 2))
    return cb(true)
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
