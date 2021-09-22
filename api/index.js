// Global Variables
const express = require('express');
const app = express();
const config = require('../config.json');
const fs = require('fs');

app.use('/capes', require('./routes/capes.js'));

app.use('/users', require('./routes/users.js'));

app.use('/assets', express.static('./api/assets'))

app.use((req, res, next)=>{
    res.status(404).send(fs.readFileSync("./api/assets/404.html").toString());
});

// Start Server
app.listen(config.port, () => {
    console.log(`API is online.`);
});