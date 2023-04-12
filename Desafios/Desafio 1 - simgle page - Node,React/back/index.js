const express = require('express');
const path = require('path');
const fs = require('fs');
const productRounter = require('./router/productApi');
const db = require('./db/database');
const Product = require('./module/Product');
const pathIndex = path.join(__dirname, '../front/build/');
const app = express();
const PORT = 4000;

(async () => {
    try {
        await db.sync();
        console.log('database connect with successfully!');

        app.use('/product', productRounter);
        app.get('/react', (req, res) => {
            res.sendFile(pathIndex + 'index.html');
        });

        app.listen(PORT, (err) => {
            if (err) return console.log(err);
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        return console.log(err);
    }
})();
