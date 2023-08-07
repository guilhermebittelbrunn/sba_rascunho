const express = require('express');
const app = express();
const path = require('path');
const api = require('./router/index');
const PORT = 5050;

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api', api);

app.get('/home', (req, res) => {
    res.send('Home page');
});

app.get('*', (req, res) => {
    res.redirect('/home');
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${PORT}`);
});
