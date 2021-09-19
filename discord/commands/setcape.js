let fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json"))

module.exports.run = async (client, message, args) => {
    let linked = JSON.parse(fs.readFileSync("./discord/linked.json"))
    let userData = JSON.parse(fs.readFileSync("./api/users.json"))
    if (!linked[message.author.id]) return message.channel.send(`I can't seem to find your username. Please ask to be linked.`)
    if (!args[0]) return message.channel.send(`${'```'}${config.prefix}setcape <capeName>${'```'}`)
    let username = linked[message.author.id];
    if (!userData[username]) {
      userData[username] = {
        "cape": null,
        "items": []
      }
    }
    if (!fs.existsSync(`./api/assets/capes/${args[0]}.png`)) return message.channel.send(`**${args[0]}** doesn't seem to be a valid cape!`)
    userData[username].cape = args[0]
    fs.writeFileSync('./api/users.json', JSON.stringify(userData, null, 2))
    message.channel.send(`**${username}** now has the **${args[0]}** cape.`, { files: [`./api/assets/capes/${args[0]}.png`] })
}

module.exports.help = {
  name:"setcape"
}