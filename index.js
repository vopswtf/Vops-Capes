var config = require('./config.json')

require("./utils/checkforupdate.js")
require("./api/index.js");

if (config.discord.active) {
    require("./discord/index.js");
}
