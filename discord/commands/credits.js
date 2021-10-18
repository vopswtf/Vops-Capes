const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json"))
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
  .setTitle("Credits")
  .setURL("https://vops.cc/")
  .setColor('BLUE')
  .setDescription("Cape System created by ItsVops on GitHub.\n\nhttps://vops.cc\nhttps://github.com/ItsVops\nhttps://twitter.com/vopswtf")
  .setThumbnail("https://i.imgur.com/mPAj7qS.png")
  message.channel.send(embed)
}

module.exports.help = {
  name:"credits",
  action: "view the credits"
}