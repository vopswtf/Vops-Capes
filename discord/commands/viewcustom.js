let fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json"))
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!args[0]) return createEmbed('info', 'View Cape Command', `Command to view a cape's texture ` + "\n\n**Usage**\n\n" +  "``!viewcape <cape>``", null, message)
    if (!fs.existsSync(`./api/assets/custom/${args[0]}.png`)) return createEmbed('error', 'Unknown Cape', 'That cape is not available or does not exist!\n\nTo see a list of available capes use: ``!list cape``', null, message)
    const attachment = new Discord.MessageAttachment(`./api/assets/custom/${args[0]}.png`, `${args[0]}.png`);
    const embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle(`${args[0]}'s Custom Cape`)
    .attachFiles(attachment)
    .setImage(`attachment://${args[0]}.png`);

    message.channel.send({embed});
}

module.exports.help = {
  name:"viewcustom",
  action: "view a custom cape"
}