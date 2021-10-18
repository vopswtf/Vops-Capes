let fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json"))

let users;
if (config.storage.type === 'json') {
    users = require('../../api/storage/json.js');
} else if (config.storage.type === 'mysql') {
    users = require('../../api/storage/mysql.js');
}

module.exports.run = async (client, message, args) => {
    if (!config.ownerIds.includes(message.author.id)) return createEmbed('warning', 'No Permission!', `You don't have permission to use this command!`, null, message)
    if (!message.mentions.users.first() || !args[1]) return createEmbed('info', 'Link Command', `Command to link discord users to their minecraft account.` + "\n\n**Usage**\n\n" +  "``!link <discord tag> <minecraft username>``\n\nTo see a list of available capes, use ``!list cape``", null, message)
    let member = message.mentions.users.first();
    users.setLink(member.id, args[1], output => {
      if (output === true) {
        createEmbed('success', 'User Linked', `${member} is now linked to **${args[1]}**.`, null, message)
      } else {
        createEmbed('error', 'Error', `There was a problem linking ${member} to **${args[1]}**.`, null, message)
      }
    })
}

module.exports.help = {
  name:"link",
  action: "link a minecraft player to their discord account"
}