const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json"))
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let linked = JSON.parse(fs.readFileSync("./discord/linked.json"))
    let userData = JSON.parse(fs.readFileSync("./api/users.json"))
    let member = message.mentions.users.first();
    if (!args[0]) return message.channel.send(`${'```'}${config.prefix}info <username or discord>${'```'}`)
    if (linked[member.id]) {
      let embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setDescription(`**Discord: **${member}\n**Username: **${linked[member.id]}\n**Cape: **${userData[linked[member.id]].cape || "None"}\n**Item: **${userData[linked[member.id]].items[0] || "None"}`)
      message.channel.send(embed)
    } else if (userData[args[0]]) {
      let discordId;
      for (var key in linked) {
        if (linked[key] === args[0]) {
          discordId = key;
        }
      }
      let embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setDescription(`**Discord: **<@${discordId}>\n**Username: **${args[0]}\n**Cape: **${userData[args[0]].cape || "None"}\n**Item: **${userData[args[0]].items[0] || "None"}`)
      message.channel.send(embed)
    } else {
      message.channel.send(`User is not linked!`)
    }
}

module.exports.help = {
  name:"info"
}