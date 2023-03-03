const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const port = 3000;
const app = express();
const path_index = path.join(__dirname, 'public');
const messages = {grupo1: [],grupo2:[]};

app.use('/grupo1',express.static(path_index));
app.use('/grupo2',express.static(path_index));

const server = app.listen(port, (err)=>{
    if(err) console.log(err);
    else console.log('Server running on port: ' + port);
})

const io = socketIO(server);

const grupo1 = io.of('/grupo1').on('connection', (socket)=>{
    
    console.log('new connection');
    socket.emit('updateMessages', messages.grupo1);

    socket.on('newMessage', (message)=>{

        messages.grupo1.push(message);
        grupo1.emit('updateMessages', messages.grupo1);

    }) 
})

const grupo2 = io.of('/grupo2').on('connection', (socket)=>{
    
    console.log('new connection');
    socket.emit('updateMessages', messages.grupo2);

    socket.on('newMessage', (message)=>{

        messages.grupo2.push(message);
        grupo2.emit('updateMessages', messages.grupo2);

    })
    
})