let request = require('request');
let fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json"))

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

module.exports.run = async (client, message, args) => {
    let image = message.attachments.entries().next().value;
    let linked = JSON.parse(fs.readFileSync("./discord/linked.json"))
    let userData = JSON.parse(fs.readFileSync("./api/users.json"))
    if (!linked[message.author.id]) return message.channel.send(`I can't seem to find your username. Please ask to be linked.`)
    if (!image || !image[1]) return message.channel.send(`${'```'}${config.prefix}setcustom [fileUpload]${'```'}`)
    image = image[1]
    if (!image.name.endsWith(".png")) return message.channel.send(`Invalid file format! Please use a PNG.`)
    let username = linked[message.author.id];
    if (!userData[username]) {
      userData[username] = {
        "cape": null,
        "items": []
      }
    }
    download(image.url, `./api/assets/capes/${username}.png`, () => {
      userData[username].cape = "custom"
      fs.writeFileSync('./api/users.json', JSON.stringify(userData, null, 2))
      message.channel.send(`**${username}** now has their **custom** cape.`, { files: [`./api/assets/capes/${username}.png`] })
    })
}

module.exports.help = {
  name:"setcustom"
}