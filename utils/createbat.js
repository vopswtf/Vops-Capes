const fs = require('fs')
const readlineSync = require('readline-sync');

function ValidateIPaddress(ipaddress) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
      return (true)  
    }
    return (false)  
}  

console.log('Please note that the port must be 80 in the config for this bat file to work.\n')
var ipAddress = readlineSync.question('What is the IP address of your machine where you are hosting this API?\n');

if (!ValidateIPaddress(ipAddress)) return console.log('Invalid IP Address!')

let batTemplate = fs.readFileSync('./utils/bat.txt').toString()

batTemplate = batTemplate.replace(/REPLACE_ME/g, ipAddress);

console.log('Created bat installer! (installer.bat)')
fs.writeFileSync('./Installer.bat', batTemplate)