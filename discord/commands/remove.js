const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json"))
const Discord = require("discord.js");

let users;
if (config.storage.type === 'json') {
  users = require('../../api/storage/json.js');
} else if (config.storage.type === 'mysql') {
  users = require('../../api/storage/mysql.js');
}


module.exports.run = async (client, message, args) => {
  if (!config.ownerIds.includes(message.author.id)) return createEmbed('warning', 'No Permission!', `You don't have permission to use this command!`, null, message)
  if (!args[0] || !args[1]) return createEmbed('info', 'Remove Command', `Command remove a player's cape or item.` + "\n\n**Usage**\n\n" + "``!remove <username> <cape/item>``", null, message)
  users.getUser(args[0], (userInfo) => {
    if (args[1] === "cape") {
      if (userInfo.cape === null) return createEmbed('warning', 'Error', '``'+args[0]+'``' + ` doesn't have a cape selected.`, null, message)
      users.setCape(args[0], "none", diditwork => {
        if (diditwork) {
          createEmbed('success', 'Success', 'The cape has been removed on the ``'+args[0]+'`` account.', null, message)
        } else {
          createEmbed('warning', 'Error', 'An error occured.', null, message)
        }
      });
    } else if (args[1] === "item") {
      if (userInfo.item === null) return createEmbed('warning', 'Error', '``'+args[0]+'``' + ` doesn't have an item selected.`, null, message)
      users.setItem(args[0], "none", diditwork => {
        if (diditwork) {
          createEmbed('success', 'Success', 'The item has been removed on the ``'+args[0]+'`` account.', null, message)
        } else {
          createEmbed('warning', 'Error', 'An error occured.', null, message)
        }
      });
    } else {
      return createEmbed('info', 'Remove Command', `Command remove a player's cape or item.` + "\n\n**Usage**\n\n" + "``!remove <username> <cape/item>``", null, message)
    }
  })
}

module.exports.help = {
  name: "remove",
  action: "remove a player's item and cape"
}