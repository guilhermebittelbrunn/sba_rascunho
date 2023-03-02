//Packets
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const pathIndex = path.join(__dirname, 'public');

//Instâncias
const app = express();
const server = app.listen(3000,(err)=>{
    if(err) console.log(err);
    else console.log('Servidor rodando na porta 3000');
})
const io = socketIO(server);

//Server

const messages = [];

app.use('/', express.static(pathIndex));

io.on('connection', (socket)=>{

    socket.on('new_message', (data)=>{
        messages.push(data.msg);

        io.emit('update_messages', messages);
    })

})