const express = require('express');
const app = express();
const path = require('path');
const api = require('./router/api');
const db = require('./db/db');

app.set('Views');
app.set('view Engine', 'ejs');

db.sync()
    .then((res) => {
        console.log('database running');
    })
    .catch((err) => {
        console.log(`error: ${err}`);
    });

app.use(express.static(path.join(__dirname, './public')));
app.use('/api', api);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/aa.html'));
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
});
