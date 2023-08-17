const express = require('express');
const cors = require('cors');
const app = express();
const api = require('./router');
require('dotenv').config;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', api);

app.get('*', (req, res) => {
    res.redirect('/api');
});

app.listen(process.env.PORT || 3535, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${process.env.PORT || 3535}`);
});
