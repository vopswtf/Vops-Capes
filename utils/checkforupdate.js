const fetch = require('sync-fetch');
const package = require('../package.json');
const fs = require('fs');

let installedVer = package.version;

// check for version update
let latestData = fetch('https://raw.githubusercontent.com/ItsVops/Vops-Capes/main/package.json').json();
if (installedVer !== latestData.version) {
    console.log("WARNING!\nWARNING! --- THIS IS AN OLD VERSION OF VOPS CAPES AND MAY BE MISSING CORE FEATURES\nWARNING! --- UPDATE HERE: https://github.com/ItsVops/Vops-Capes\nWARNING!");
}

// check for item updates
let itemList = fetch('https://capes.vops.cc/itemList.json').json();
let currentList = fs.readdirSync('./api/assets/items');
let missingItems = [];

itemList.forEach(item => {
    if (!currentList.includes(item)) {
        missingItems.push(item);
    }
})

if (missingItems.length > 0) {
    console.log("[UPDATER] You seem to be missing some items. Downloading...")
    missingItems.forEach(item => {
        let texture = fetch(`https://raw.githubusercontent.com/ItsVops/Vops-Capes/main/api/assets/items/${item}/texture.png`).buffer();
        let model = fetch(`https://raw.githubusercontent.com/ItsVops/Vops-Capes/main/api/assets/items/${item}/model.cfg`).buffer();
        fs.mkdirSync("./api/assets/items/" + item)
        fs.writeFileSync("./api/assets/items/" + item + "/texture.png", texture)
        fs.writeFileSync("./api/assets/items/" + item + "/model.cfg", model)
        console.log("[UPDATER] Downloaded " + item)
    })
}