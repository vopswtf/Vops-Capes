let fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json"))
require('../../utils/embed.js')();

let users;
if (config.storage.type === 'json') {
    users = require('../../api/storage/json.js');
} else if (config.storage.type === 'mysql') {
    users = require('../../api/storage/mysql.js');
}


module.exports.run = async (client, message, args) => {
  users.getLink(message.author.id, username => {
    if (!username) return createEmbed('error', 'You aren\'t linked!', `You don't seem to have a linked minecraft account!\n\nIf this is a mistake, contact one of the cape owners.`, null, message)
    if (!args[0]) return createEmbed('info', 'Set Item Command', `Command to add or change your player's item` + "\n\n**Usage**\n\n" + "``!setitem <item>``\n\nTo see a list of available items, use ``!list item``", null, message)
    users.setItem(username, args[0], diditwork => {
      if (diditwork === true) {
        if (args[0].toLowerCase() === "none") {
          createEmbed('success', 'Success', 'Your item has been cleared on your ``'+username+'`` account.', null, message)
          return;
        }
        createEmbed('success', 'Item Equipped', `You have successfully equipped the **${args[0]}** item on your **${username}** account.`, args[0].toLowerCase(), message)
      } else {
        createEmbed('error', 'Unknown Item', 'That item is not available or does not exist!\n\nTo see a list of available items use: ``!list item``', null, message)
      }
    })
  })
}

module.exports.help = {
  name:"setitem",
  action: "set your item"
}