let request = require('request');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json"))
require('../../utils/embed.js')()

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

let users;
if (config.storage.type === 'json') {
    users = require('../../api/storage/json.js');
} else if (config.storage.type === 'mysql') {
    users = require('../../api/storage/mysql.js');
}

module.exports.run = async (client, message, args) => {
    let image = message.attachments.entries().next().value;
    users.getLink(message.author.id, username => {
      if (!username) return createEmbed('error', 'You aren\'t linked!', `You don't seem to have a linked minecraft account!\n\nIf this is a mistake, contact one of the cape owners.`, null, message)
      if (!image || !image[1]) return createEmbed('info', 'Set Custom Command', `Command to add or change your player's custom cape` + "\n\n**Usage**\n\n" +  "``!setcustom [fileUpload]``", null, message)
      image = image[1]
      if (!image.name.endsWith(".png")) return createEmbed('error', 'Error', `Invalid file format! Please use a PNG.`, null, message)
      download(image.url, `./api/assets/capes/${username}.png`, () => {
        users.setCape(username, 'custom', output => {
          let embed = createEmbed('success', 'Cape Equipped', `You have successfully equipped the **custom** cape on your **${username}** account.`)
          message.channel.send({ embed: embed, files: [`./api/assets/capes/${username}.png`] })
        })
      })
    })
}

module.exports.help = {
  name:"setcustom",
  action: "set a custom cape for yourself"
}