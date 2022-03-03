let fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json"))
let server = require('../../server/server.js')

let users = require('../../api/storage/json.js');
if (config.storage.type === 'json') {
    users = require('../../api/storage/json.js');
} else if (config.storage.type === 'mysql') {
    users = require('../../api/storage/mysql.js');
}

module.exports.run = async (client, message, args) => {
    if (!config.server.active) return message.channel.send("The server is currently offline.")
    if (!args[0]) return createEmbed('info', 'Verify Command', `Command to link discord users to their minecraft account using the server.` + "\n\n**Usage**\n\n" +  "``!verify <code>``", null, message)
    let code = args[0];
    let username = server.currentCodes[code];
    if (!username) return createEmbed('warning', 'Invalid Code', `This code does not appear to be associated with a minecraft account!`, null, message)
    users.setLink(message.author.id, username, (res) => {
        if (res) {
            server.clearUser(username)
            createEmbed('success', 'User Linked', `${message.author} is now linked to **${username}**.`, null, message)
        }
    })
}

module.exports.help = {
  name: "verify",
  action: "verify your account using the server"
}