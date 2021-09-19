let fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json"))

module.exports.run = async (client, message, args) => {
    if (!config.ownerIds.includes(message.author.id)) return message.channel.send(`You don't have access to link users!`)
    let linked = JSON.parse(fs.readFileSync("./discord/linked.json"))
    if (!message.mentions.users.first() || !args[1]) return message.channel.send(`${'```'}${config.prefix}link <discord tag> <minecraft username>${'```'}`)
    let member = message.mentions.users.first();
    linked[member.id] = args[1];
    fs.writeFileSync('./discord/linked.json', JSON.stringify(linked, null, 2))
    message.channel.send(`${member} is now linked to **${args[1]}**.`)
}

module.exports.help = {
  name:"link"
}