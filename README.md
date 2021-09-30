# Vops Capes

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

Edit `config.json`.
```json
{
    "port": "80",
    "token": "DISCORD_BOT_TOKEN",
    "prefix": "!",
    "ownerIds": ["DISCORD_ID1", "DISCORD_ID2"]
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

This system is integrated with a Discord Bot. Here you can find a list of commands available. "!" is the default prefix but can be changed in the config.

```
!link <discord user> <minecraft username>
!setcape <capeName>
!setcustom <capeFile>
!setitem <itemName>
!list <cape/item>
!viewcape <cape>
!info <discord/minecraft username>
```

## Credits and Details

This was originally a private system for [FuckBeingSad](https://fuckbeingsad.club/) (friend group) which I designed. I decided to revamp it and release it on GitHub for the public.

Please understand that this API is meant for small groups of friends, small servers, etc. This is in no way ready for production as it stores in JSON to keep 
things simple.

## License

Distributed under the GNU General Public License. See [LICENSE](https://github.com/ItsVops/vops-capes/blob/main/LICENSE) for more information.

## Contact

website - [vops.cc](https://vops.cc)

twitter - [@vopswtf](https://twitter.com/vopswtf)

discord - [vops#0001](#)
