const express = require('express');
const app = express();
const db = require('./db/db');
const Produto = require('./module/produto');

db.sync()
    .then((res) => {
        console.log('Banco rodando');
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/produto', async (req, res) => {
    await Produto.create({
        titulo: 'Teclado',
        descricao: 'Teclado dell',
    });
    res.send('Produto adicionado');
});

app.get('/produtos', async (req, res) => {
    const produtos = await Produto.findAll();
    res.send(produtos);
});

app.get('/produto/:id', async (req, res) => {
    const id = req.params.id;
    const produto = await Produto.findOne({
        where: {
            codigo: id,
        },
    });
    produto.titulo = 'Monitor';
    await produto.save();
    res.send(produto);
});

app.get('/produto/deletar/:id', async (req, res) => {
    const id = req.params.id;
    const produto = await Produto.findByPk(id);
    await produto.destroy();
    res.send('Produto deletado');
});

app.listen(4000, (error) => {
    if (error) console.log(error);
    else console.log('Servidor rodando na porta 4000');
});
