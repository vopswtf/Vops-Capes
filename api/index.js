// Global Variables
const express = require('express');
const app = express();
const config = require('../config.json');

app.use('/capes', require('./routes/capes.js'));

app.use('/users', require('./routes/users.js'));

app.use('/assets', express.static('./api/assets'))

app.use((req, res, next)=>{
    res.redirect('http://107.182.233.85' + req.originalUrl)
});

// Start Server
app.listen(config.port, () => {
    console.log(`API is online.`);
});