const express = require('express');
const app = express();

app.get('/teste1', (req, res, next) => {
    res.send('teste1');
});

app.get('/teste2', (req, res, next) => {
    throw new Error('teste3 deu erro');
});

app.get('/teste3', (req, res, next) => {
    throw new Error('teste3 deu erro');
});

app.listen(3000, () => {
    console.log('Server running at 3000');
});
app.use((error, req, res, next) => {
    console.log('error middleware');
    res.sendStatus(500);
});
