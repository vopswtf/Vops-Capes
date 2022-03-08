// Global Variables
const express = require('express');
const router = express.Router();
const config = require('../../../config.json');
const fetch = require('sync-fetch')
const fs = require('fs');
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
	if (!discordData.id) return res.json(discordData)
	if (!config.panel.allowedInPanel.includes(discordData.id)) return res.send(401);
	req.userInfo = discordData;
	next();
});

router.get('/pages', (req, res) => {
	let capeList = fs.readdirSync("./api/assets/capes");
	let itemList = fs.readdirSync("./api/assets/items");
	users.getAllUsers(allusers => {
		res.json({
			users: Math.ceil(allusers.length/10),
			capes: Math.ceil(capeList.length/10),
			items: Math.ceil(itemList.length/10)
		})
	});
})

router.get('/discord/:username', (req, res) => {
	let username = req.params.username;
	users.getLinkFromUser(username, (id) => {
		if (!id) return res.json({discord:null})
		let discordData = fetchUserById(id)
		if (!discordData) return res.json({discord:null})
		res.json({discord:discordData})
	})
})

router.get('/users', async (req, res) => {
	let { page } = req.query;
	try {
		if (!page) return res.json({ error: "no page query" })
		page = parseInt(page);

		users.getUsersFromPage(page, async (allusers) => {
			res.json(allusers)
		})
	} catch (err) { res.json({ error: "no page query" }) }
});

function paginate(array, page_size, page_number) {
	return array.slice((page_number - 1) * page_size, page_number * page_size);
 }


router.get('/capes', async (req, res) => {
	let { page } = req.query;
	try {
		if (!page) return res.json({ error: "no page query" })
		page = parseInt(page);

		let capeList = fs.readdirSync("./api/assets/capes");
		let capePage = paginate(capeList, 10, page)
		return res.json(capePage)

	} catch (err) { res.json({ error: "no page query" }) ;console.log(err)}
});

router.get('/items', async (req, res) => {
	let { page } = req.query;
	try {
		if (!page) return res.json({ error: "no page query" })
		page = parseInt(page);

		let itemList = fs.readdirSync("./api/assets/items");
		let itemPage = paginate(itemList, 10, page)
		return res.json(itemPage)

	} catch (err) { res.json({ error: "no page query" }) ;console.log(err)}
});

module.exports = router;