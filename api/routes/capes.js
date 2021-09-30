// Global Variables
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/:username.png', async (req, res) => {
    let username = req.params.username;
    let userList = JSON.parse(fs.readFileSync('./api/users.json'));
    if (!userList[username] || !userList[username].cape) return res.redirect('http://107.182.233.85' + req.originalUrl);
    if (userList[username].cape === "custom") return res.redirect(`/assets/capes/${username}.png`)
    res.redirect(`/assets/capes/${userList[username].cape}.png`)
});


module.exports = router;