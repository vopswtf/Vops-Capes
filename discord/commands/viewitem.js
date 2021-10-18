const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json"))
const Discord = require("discord.js");
const request = require('request');
require('../../utils/embed.js')()

module.exports.run = async (client, message, args) => {
    if (!args[0]) return createEmbed('info', 'View Item Command', `Command to view an item ingame ` + "\n\n**Usage**\n\n" +  "``!viewitem <item>``", null, message)
    request(`https://vops-capes.vops.cc/previews/${args[0].toLowerCase()}.png`, function (error, response, body) {
      if (response && response.statusCode === 200) {
        const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`${args[0].toLowerCase()} Preview`)
        .setImage(`https://vops-capes.vops.cc/previews/${args[0].toLowerCase()}.png`)
        message.channel.send({embed});
      } else {
        createEmbed('error', 'Couldn\'t find preview!', `That item doesn't have a preview. `, null, message)
      }
    });
}

module.exports.help = {
  name:"viewitem",
  action: "view an item"
}