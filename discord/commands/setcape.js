let fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json"))
require('../../utils/embed.js')()
const Discord = require("discord.js")

let users;
if (config.storage.type === 'json') {
    users = require('../../api/storage/json.js');
} else if (config.storage.type === 'mysql') {
    users = require('../../api/storage/mysql.js');
}

module.exports.run = async (client, message, args) => {
    users.getLink(message.author.id, username => {
      if (!username) return createEmbed('error', 'You aren\'t linked!', `You don't seem to have a linked minecraft account!\n\nIf this is a mistake, contact one of the cape owners.`, null, message)
      if (!args[0]) return createEmbed('info', 'Set Cape Command', `Command to add or change your player's cape` + "\n\n**Usage**\n\n" +  "``!setcape <cape>``\n\nTo see a list of available capes, use ``!list cape``", null, message)
      users.setCape(username, args[0], diditwork => {
        if (diditwork === true) {
          if (args[0].toLowerCase() === "none") {
            createEmbed('success', 'Success', 'Your cape has been cleared on your ``'+username+'`` account.', null, message)
            return;
          }
          const attachment = new Discord.MessageAttachment(`./api/assets/capes/${args[0]}.png`, `${args[0]}.png`);
          let embed = createEmbed('success', 'Cape Equipped', `You have successfully equipped the **${args[0]}** cape on your **${username}** account.`)
          embed.attachFiles(attachment)
          embed.setImage(`attachment://${args[0]}.png`);
          message.channel.send({ embed: embed})
        } else {
          createEmbed('error', 'Unknown Cape', 'That cape is not available or does not exist!\n\nTo see a list of available capes use: ``!list cape``', null, message)
        }
      })
    })
}

module.exports.help = {
  name:"setcape",
  action: "set your cape"
}