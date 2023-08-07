// const express = require('express');
// const ejs = require('ejs');
// const path = require('path');

// const PORT = 4000;
// const app = express();
// const pathfile = path.join(__dirname, 'views');

// let alunos = [
//     {Nome: 'Jessica', Turma: '5B'},
//     {Nome: 'Guilherme', Turma: '3A'},
//     {Nome: 'Camilly', Turma: '7C'}
// ]

// app.set('views', pathfile);
// app.set('view engine', 'ejs');

// app.get('/', (req,res)=>{
//     res.render('index',{alunos:alunos});
// })

// app.get('/sobre',(req,res)=>{
//     res.render('about');
// })

// app.listen(PORT, (err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('Servidor rodando na porta: ' + PORT);
//     }
// })

const express = require('express');
const app = express();

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server running on port: 3000');
});
