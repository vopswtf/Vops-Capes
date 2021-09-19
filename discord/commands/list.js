let fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json"))

module.exports.run = async (client, message, args) => {
    let type = args[0];
    if (type === "cape") {
      let list = [];
      fs.readdirSync('./api/assets/capes').forEach(cape => {
        list.push(cape.slice(0, -4))
      })
      message.channel.send(list)
    } else if (type === "item") {
      let list = fs.readdirSync('./api/assets/items');
      message.channel.send(list)
    } else {
      message.channel.send(`${'```'}${config.prefix}list <cape/item>${'```'}`)
    }
}

module.exports.help = {
  name:"list"
}