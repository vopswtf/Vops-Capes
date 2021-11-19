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

## Latest Update: 1.2.0
- Added MySQL support for storage
- Added embeds to most (if not all) messages
- Might be bugs, report in discord
<img src="https://i.imgur.com/muWhCzZ.png" data-canonical-src="https://i.imgur.com/muWhCzZ.png" width="450" />
<img src="https://i.imgur.com/gS10yQ3.png" data-canonical-src="https://i.imgur.com/gS10yQ3.png" width="450" />

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
    "token": "DISCORD_BOT_TOKEN",
    "prefix": "!",
    "ownerIds": ["DISCORD_ID1", "DISCORD_ID2"],
    "storage": {
        "type": "json",
        "mysql": {
            "host": "",
            "user": "",
            "password": "",
            "database": ""
        },
        "mysql_anti_idle": true
    }
}
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
   
## License

Distributed under the GNU General Public License. See [LICENSE](https://github.com/ItsVops/vops-capes/blob/main/LICENSE) for more information.

## Contact

support discord - [discord.gg/6Xmk3HHR5v](https://discord.gg/6Xmk3HHR5v)
   
website - [vops.cc](https://vops.cc)

twitter - [@vopswtf](https://twitter.com/vopswtf)
