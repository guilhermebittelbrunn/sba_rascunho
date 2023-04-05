const path = require('path');
const express = require('express');
const app = express();
const port = 4000;
const apiRouter = require('./router/api');
const Aluno = require('./modules/Aluno');
const db = require('./database/db');

(async () => {
    try {
        await db.sync();
        console.log('Connection sucessful');
        app.use(express.urlencoded({ extended: true }));
        app.use('/alunos', apiRouter);
        app.use('*', express.static(path.join(__dirname, 'client')));

        app.listen(port, (err) => {
            if (err) console.log(err);
            else console.log('Server running on port:' + port);
        });
    } catch (err) {
        console.log(err);
    }
})();
