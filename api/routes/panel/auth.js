// Global Variables
const express = require('express');
const router = express.Router();
const config = require('../../../config.json');
const fetch = require('sync-fetch')

router.use(express.json());
router.use(express.urlencoded({ extended: true}));

router.get('/url', async (req, res) => {
    res.send(`https://discordapp.com/oauth2/authorize?client_id=${config.panel.client_id}&scope=identify&response_type=code&callback_uri=${req.protocol}://${req.hostname}/api/auth/callback`)
});

router.get('/callback', async (req, res) => {
    let { code } = req.query;
    if (code) {
		try {
			const oauthData = fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: config.panel.client_id,
					client_secret: config.panel.client_secret,
					code,
					grant_type: 'authorization_code'
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}).json();

            if (oauthData.access_token) {
                return res.send(`<script>window.localStorage.setItem('discord_oauth', '${JSON.stringify(oauthData)}');window.location.href="/panel"</script>`)
            }
            res.redirect('/panel/login')
		} catch (error) {
			res.redirect('/panel/login')
		}
	} else {
        res.redirect('/panel/login')
    }
});

router.get('/me', async (req, res) => {
	const discordData = fetch('https://discord.com/api/users/@me', {
		headers: {
			authorization: req.headers.authorization
		}
	}).json();
	if (!discordData.id) return res.json(discordData);
	if (!config.panel.allowedInPanel.includes(discordData.id)) return res.send(401);
	res.json(discordData)
});

module.exports = router;