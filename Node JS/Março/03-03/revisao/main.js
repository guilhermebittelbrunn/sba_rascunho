const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const path_index = path.join(__dirname, 'client');

const server = app.listen(4000, (err)=>{
    if (err)  console.log(err);
    else console.log('Servidor rodando na porta 4000');
})

const io = socketIO(server);
const messages = {grupo1: [], grupo2:[]};

app.use('/grupo1', express.static(path_index));
app.use('/grupo2', express.static(path_index));

const grupo1 = io.of('/grupo1').on('connection', (socket)=>{
    socket.emit('update_messages', messages.grupo1);
    socket.on('new_message', (message)=>{
        messages.grupo1.push(message);
        grupo1.emit('update_messages', messages.grupo1);
    })
})

const grupo2 = io.of('/grupo2').on('connection', (socket)=>{
    socket.emit('update_messages', messages.grupo1);
    socket.on('new_message', (message)=>{
        messages.grupo2.push(message);
        grupo2.emit('update_messages', messages.grupo2);
    })
})









