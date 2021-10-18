// Global Variables
const express = require('express');
const router = express.Router();
const config = require('../../config.json');
const fs = require('fs');

let users;
if (config.storage.type === 'json') {
    users = require('../storage/json.js');
} else if (config.storage.type === 'mysql') {
    users = require('../storage/mysql.js');
}

router.get('/:username.png', async (req, res) => {
    let username = req.params.username;
    users.getCapeUrl(username, capeUrl => {
        res.redirect(capeUrl);
    });
});


module.exports = router;