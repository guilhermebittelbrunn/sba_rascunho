const express = require('express');
const productRounter = express.Router();

productRounter.get('/', (req, res) => {
    res.send('/ page');
});

module.exports = productRounter;
