const path = require('path');
const cors = require('cors');
const colors = require('colors');
// const path = require('path');
// const fs = require('fs');

const express = require('express');
require('express-async-errors');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit1: '200mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static(path.join(__dirname, '../public')));

const morgan = require('morgan');

app.use(morgan('dev'));

const api = require('./api/routes.cjs');
app.use(cors());
app.use('/api', api);

app.get('/teste', (req, res) => {
    throw new CustomError('1', { ok: false });
    res.send({
        ok: true,
    });
});

const CustomError = require('./utils/CustomError.cjs');

app.use((err, req, res, next) => {
    console.log('Error:'.red, err);

    if (err instanceof CustomError) {
        return res.status(err.status || 500).send({
            type: 'CustomError',
            message: err.message,
            additional: err.additional,
        });
    }

    return res.status(500).send(err.message);

    //next(err);
});

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

/*

GET http://localhost:3000/teste HTTP/1.1

*/
