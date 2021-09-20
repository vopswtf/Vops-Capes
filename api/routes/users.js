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

module.exports = router;