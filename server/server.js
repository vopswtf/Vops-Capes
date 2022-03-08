var mc = require('minecraft-protocol');
var config = require('../config.json');

let currentCodes = {};
let cache = [];

let users = require('../api/storage/json.js');
if (config.storage.type === 'json') {
    users = require('../api/storage/json.js');
} else if (config.storage.type === 'mysql') {
    users = require('../api/storage/mysql.js');
} 

var server = mc.createServer({
    'online-mode': true,
    encryption: true,
    host: '0.0.0.0',
    port: config.server.port,
    motd: config.server.motd,
    version: config.server.version,
    maxPlayers: -1
});

server.on('login', function (client) {
    let profile = client.profile;
    if (cache.includes(profile.name)) {
        for (var key in currentCodes) {
            if (currentCodes[key] === profile.name) {
                return client.end(`§9Use §b${config.discord.prefix}verify ${key}§9 to link your account.`)
            }
        }
    }
    let code = genCode();
    if (currentCodes[code] && currentCodes[code] !== profile.name) return client.end("§cthis is basically an easter egg lol. reconnect for your actual code.")
    currentCodes[code] = profile.name
    cache.push(profile.name)
    client.end(`§9Use §b${config.discord.prefix}verify ${code}§9 to link your account.`)
});

console.log("Linking Server is online.")


function genCode() {
    return Buffer.from(Math.random().toString()).toString("base64").substring(10, 5)
}

function clearUser(username) {
    for (var key in currentCodes) {
        if (currentCodes[key] === username) {
            delete currentCodes[key];
        }
    }

    cache = cache.filter(user => user !== username); 
}

module.exports = {
    currentCodes,
    cache,
    clearUser
}