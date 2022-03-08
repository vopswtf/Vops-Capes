// Global Variables
const express = require('express');
const router = express.Router();
const config = require('../../../config.json');
const fetch = require('sync-fetch')
let { fetchUserById } = require("../../../discord/index.js")
let users = require('../../storage/mysql.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(async (req, res, next) => {
	const discordData = fetch('https://discord.com/api/users/@me', {
		headers: {
			authorization: req.headers.authorization
		}
	}).json();
	// TODO: MAKE IT VERIFY
	if (!discordData.id) return res.json(discordData)
	req.userInfo = discordData;
	next();
});

router.post('/player', async (req, res) => {
	const { username, cape, item } = req.body;
	if (!username) return res.json({error: "no username"})
	users.setCape(username, cape || "none", (diditwork) => {
		users.setItem(username, item || "none", (diditwork2) => {
			if (diditwork2 && diditwork) return res.json({success: true})
			return res.json({success: false})
		})
		
	})
});

module.exports = router;