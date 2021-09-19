// Global Variables
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/:username.cfg', async (req, res) => {
    try {
        let username = req.params.username;
        let userList = JSON.parse(fs.readFileSync('./api/users.json'));
        if (!userList[username] || !userList[username].items) return res.redirect('http://107.182.233.85' + req.originalUrl);
        let obj = {items:[]}
        userList[username].items.forEach(item => {
            obj.items.push({
                "type": "custom",
                "model": "assets/items/"+item+"/model.cfg",
                "texture": "assets/items/"+item+"/texture.png",
                "active": "true"
            })
        })
        res.send(JSON.stringify(obj))
    } catch(err) {
        res.send(err)
    }
});

router.get('/set/:username/:item', async (req, res) => {
    let username = req.params.username;
    let item = req.params.item;
    let userList = JSON.parse(fs.readFileSync('./users.json'));
    if (!fs.existsSync('./assets/items/' + item + '/model.cfg')) return res.json({success: false, error: "that item doesnt exist MORON"})
    userList[username].items = [item]
    fs.writeFileSync("./users.json", JSON.stringify(userList, null, 2));
    res.json({success: true})
});

router.get('/clear/:username', async (req, res) => {
    let username = req.params.username;
    let userList = JSON.parse(fs.readFileSync('./users.json'));
    if (!userList[username]) return res.json({success: false, error: "user doesnt have a cape to clear"})
    userList[username] = {cape: null}
    fs.writeFileSync("./users.json", JSON.stringify(userList, null, 2));
    res.json({success: true})
});

module.exports = router;