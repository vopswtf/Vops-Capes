// Global Variables
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/:username.png', async (req, res) => {
    let username = req.params.username;
    let userList = JSON.parse(fs.readFileSync('./api/users.json'));
    if (!userList[username] || !userList[username].cape) return res.redirect('http://107.182.233.85' + req.originalUrl);
    res.redirect(`/assets/capes/${userList[username].cape}.png`)
});

router.get('/set/:username/:cape', async (req, res) => {
    let username = req.params.username;
    let cape = req.params.cape;
    let userList = JSON.parse(fs.readFileSync('./users.json'));
    if (!fs.existsSync('./assets/capes/' + cape + '.png')) return res.json({success: false, error: "capeNotFound"})
    userList[username] = {cape: cape}
    fs.writeFileSync("./users.json", JSON.stringify(userList, null, 2));
    res.json({success: true, url: "https://capes.vops.cc/assets/capes/"+cape+".png"})
});

router.get('/clear/:username', async (req, res) => {
    let username = req.params.username;
    let userList = JSON.parse(fs.readFileSync('./users.json'));
    if (!userList[username]) return res.json({success: false, error: "userNotFound"})
    delete userList[username];
    fs.writeFileSync("./users.json", JSON.stringify(userList, null, 2));
    res.json({success: true})
});


module.exports = router;