const sockeIO = require('socket.io');
const express = require('express');
const path = require('path');

const app = express();
const pathIndex = path.join(__dirname, 'client');

app.use('/', express.static(pathIndex));

const server = app.listen(4000, (erro)=>{
    if(erro){
        console.log(erro);
    }else{
        console.log('Servidor rodando na porta 3000');
    }
})

const io = sockeIO(server);

io.on('connection', (socket)=>{
    socket.emit('bem-vindo', {msg: "Seja bem-vindo"});

    socket.on('ola', (data)=>{
        console.log(data);
    })
})