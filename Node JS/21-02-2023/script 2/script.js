const express = require('express');
const path = require('path')
const apiRoute = require('./routes/api');

const APP = express();
const PORT = 3000;


APP.use('/', express.static(path.join(__dirname, 'public')));
APP.use('/api', apiRoute);

APP.listen(PORT, (err) => {
    if (err) { throw err; }
    else {
        console.log('Server rodando na porta: ' + PORT);
    }
})


