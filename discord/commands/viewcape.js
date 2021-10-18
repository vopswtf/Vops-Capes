let fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json"))
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!args[0]) return createEmbed('info', 'View Cape Command', `Command to view a cape's texture ` + "\n\n**Usage**\n\n" +  "``!list <cape/item>``", null, message)
    if (!fs.existsSync(`./api/assets/capes/${args[0]}.png`)) return createEmbed('error', 'Unknown Cape', 'That cape is not available or does not exist!\n\nTo see a list of available capes use: ``!list cape``', null, message)
    const attachment = new Discord.MessageAttachment(`./api/assets/capes/${args[0]}.png`, `${args[0]}.png`);
    const embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle(`${args[0]} Cape`)
    .attachFiles(attachment)
    .setImage(`attachment://${args[0]}.png`);

    message.channel.send({embed});
}

module.exports.help = {
  name:"viewcape",
  action: "view a cape"
}