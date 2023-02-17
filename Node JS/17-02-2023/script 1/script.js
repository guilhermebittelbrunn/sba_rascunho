const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

let requirepath = path.join(__dirname);
let requirepath2 = path.join(__filename);

app.use(express.static(requirepath));

app.listen(port, ()=>{
    console.log('Server rodando na porta:' + port);
});


console.log(requirepath +'\n'+ requirepath2);
