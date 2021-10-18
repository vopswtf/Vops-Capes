const Discord = require("discord.js");

module.exports = function() {
    this.createEmbed = function(type, title, msg, msg2, message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(title)
            .setDescription(msg)
        if (type === "error") {
            embed.setColor('#FF5858')
            embed.setThumbnail(`https://vops-capes.vops.cc/bot/no.png`)
        }
        if (type === "success") {
            if (msg2) {
                embed.setImage(`https://vops-capes.vops.cc/previews/${msg2}.png`)
            }
            embed.setColor('#58FF61')
            embed.setThumbnail(`https://vops-capes.vops.cc/bot/yes.png`)
        }
        if (type === "warning") {
            embed.setColor('#FFF650')
            embed.setThumbnail(`https://vops-capes.vops.cc/bot/warning.png`)
        }
        if (type === "info") {
            embed.setColor('#58BAFF')
        }
        if (message) {
            message.channel.send(embed)
            return;
        }
        return embed;
    }
}