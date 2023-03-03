const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const port = 3000;
const app = express();
const path_index = path.join(__dirname, 'public');
const messages = [];

app.use('/',express.static(path_index));
const server = app.listen(port, (err)=>{
    if(err) console.log(err);
    else console.log('Server running on port: ' + port);
})

const io = socketIO(server);

io.on('connection', (socket)=>{
    
    console.log('new connection');
    socket.emit('updateMessages', messages);

    socket.on('newMessage', (message)=>{

        messages.push(message);
        io.emit('updateMessages', messages);

    })
    

})