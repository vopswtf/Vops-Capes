# Vops Capes

<p>
   <a href="https://discord.gg/6Xmk3HHR5v">
   <img src="https://img.shields.io/discord/893202408501551204?color=blue&label=support%20discord"
      alt="support"></a>
<p>

Vops Capes is a self-hosted cape system for Minecraft that gives you full control of your cosmetics.

This system allows for the users to apply custom capes at no cost, aswell as cosmetics such as hats or backpacks.
<img src="https://i.imgur.com/jyCJ8c6.png" data-canonical-src="https://i.imgur.com/jyCJ8c6.png" width="125" height="260" />
<img src="https://i.imgur.com/GeOBVmq.png" data-canonical-src="https://i.imgur.com/GeOBVmq.png" width="200" height="260" />

## Installation

Install [Node.js](https://nodejs.org/en/)

Clone the repository.
```bash
git clone https://github.com/ItsVops/vops-capes.git
```

Install NPM packages.
```bash
npm install
```

Edit `config.json`. (type can be "json" or "mysql")
```json
{
    "port": "80",
    "storage": {
        "type": "json",
        "mysql": {
            "host": "",
            "user": "",
            "password": "",
            "database": ""
        },
        "mysql_anti_idle": true
    },
    "discord": {
        "active": true,
        "token": "",
        "prefix": "!",
        "ownerIds": ["OWNERID1", "OWNERID2"]
    },
    "server": {
        "active": true,
        "port": 25565,
        "motd": "§9Vops Capes §7» §bLink your Account",
        "version": "1.8.8"
    },
    "panel": {
        "active": false,
        "allowedInPanel": ["DISCORD_ID", "PUT_MORE_IDS"],
        "client_id": "",
        "client_secret": ""
    }
}
```

If you are using the panel, add these to your bot oauth redirect urls
```bash
http://{ip of vps}/api/auth/callback
http://s.optifine.net/api/auth/callback
```

Create an installer for your users.
```bash
npm run installer
```

Run the cape system.
```bash
npm run start
```

## Discord Commands

This system is integrated with a Discord bot. Use the command `!help` for a list of available commands. "!" is the default prefix but can be changed in the config.

## Credits and Details

This was originally a private system for [FuckBeingSad](https://fuckbeingsad.club/) (friend group) which I designed. I decided to revamp it and release it on GitHub for the public.

If you require support, please do not add me on discord. Instead, join the [support discord](https://discord.gg/6Xmk3HHR5v)!

Vops Capes and anything affiliated with Vops Capes is meant for educational purposes only.

Credit to [Creative-Tim.com](https://www.creative-tim.com/product/material-dashboard) for Panel Design
   
## License

Distributed under the GNU General Public License. See [LICENSE](https://github.com/ItsVops/vops-capes/blob/main/LICENSE) for more information.

## Contact

support discord - [discord.gg/6Xmk3HHR5v](https://discord.gg/6Xmk3HHR5v)
   
website - [vops.cc](https://vops.cc)

twitter - [@vopswtf](https://twitter.com/vopswtf)
