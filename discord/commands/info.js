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
    if (!args[0]) return createEmbed('info', 'Info Command', `Command to view information on a minecraft/discord user ` + "\n\n**Usage**\n\n" +  "``!info <username/discord>``", null, message)
    let member = message.mentions.users.first() || {}
    users.getLink(member.id, username => {
      users.getUser(args[0], info => {
        if (member && username) {
          let embed = new Discord.MessageEmbed()
          .setColor('BLUE')
          users.getUser(username, lol => {
            embed.setDescription(`**Discord: **${member}\n**Username: **${username}\n**Cape: **${lol.cape}\n**Item: **${lol.item}`)
            embed.setThumbnail(`https://minotar.net/avatar/${username}/100`)
            message.channel.send(embed)
          })
        } else if (info) {
          users.getLinkFromUser(args[0], linkGot => {
            let embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription(`**Discord: **<@${linkGot}>\n**Username: **${args[0]}\n**Cape: **${info.cape}\n**Item: **${info.item}`)
            .setThumbnail(`https://minotar.net/avatar/${args[0]}/100`)
            message.channel.send(embed)
          })
        } else {
          createEmbed('error', 'Error', `Couldn't find user!`, null, message)
        }
      });
    })
}

module.exports.help = {
  name:"info",
  action: "get information about a player or discord user"
}