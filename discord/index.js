const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const { MessageAttachment } = require('discord.js');
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();
let helpContent = "";

fs.readdir("./discord/commands", (err, files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){console.log("Couldn't find commands.");return;}
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
    helpContent += 'Use ``'+ config.prefix + props.help.name + "`` to " + props.help.action + "!\n"
  });
});

client.on("ready", async () => {
  console.log(`Discord Bot is online.`);
  client.user.setActivity('Your Capes!', { url: 'https://twitch.tv/vopstv', type: 'STREAMING' });
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  if(!cmd.startsWith(config.prefix)) return;
  if(cmd.toLowerCase() === config.prefix + "help") {
    createEmbed('info', 'Vops Capes Help', helpContent, null, message)
  }
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);

});

client.login(config.token);