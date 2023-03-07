const express = require('express');
const routerApi = require('./router/api');
const db = require('./database/index');
const Produto = require('./database/produto');
const app = express();



async function connect(){
    await db.sync();
}
 
connect();



// app.use(express.json());
// app.use(routerApi);

// app.listen(3000,(err)=>{
//     if(err)console.log(err);
//     else console.log('Servidor rodando na porta 3000');
// })