const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database/db');
const productApi = require('./router/productRouter');
const userApi = require('./router/userRouter');
const app = express();

require('dotenv').config();

(async () => {
    try {
        await db.sync();
        console.log('Database connect with sucess!');
    } catch (err) {
        console.log(err);
    } finally {
        app.use(cors());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use('/product', productApi);
        app.use('/user', userApi);

        app.listen(process.env.PORT, (err) => {
            if (err) return console.log(err);
            console.log(`Server running on port ${process.env.PORT}`);
        });
    }
})();