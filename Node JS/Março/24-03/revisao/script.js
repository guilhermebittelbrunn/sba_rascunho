const express = require('express');
const app = express();
const path = require('path');
const pathPublic = path.join(__dirname, 'public');

app.use(express.static(path.join(__dirname, './public')));
app.get('/teste', (req, res) => {
    res.send({ ok: true });
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/aa.html'));
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
});
