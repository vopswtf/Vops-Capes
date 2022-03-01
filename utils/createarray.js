const fs = require('fs')

const itemList = fs.readdirSync('./api/assets/items')

fs.writeFileSync('./itemList.json', JSON.stringify(itemList, null, 2))