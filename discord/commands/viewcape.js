let fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json"))

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send(`${'```'}${config.prefix}viewcape <capeName>${'```'}`)
    if (!fs.existsSync(`./api/assets/capes/${args[0]}.png`)) return message.channel.send(`**${args[0]}** doesn't seem to be a valid cape!`)
    message.channel.send({ files: [`./api/assets/capes/${args[0]}.png`] })
}

module.exports.help = {
  name:"viewcape"
}