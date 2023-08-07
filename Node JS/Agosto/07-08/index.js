const express = require('express');
const api = require('./router');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', api);

app.get('/', (req, res) => {
    res.send('sequelize');
});

app.listen(process.env.PORT || 6666, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${process.env.PORT || 6666}`);
});
