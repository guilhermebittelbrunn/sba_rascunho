
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const professorSchema = new mongoose.Schema({
    nome: String,
    disciplina: String,
    idade: Number
})
const Professor = mongoose.model('professores', professorSchema);

app.get('/',(req,res)=>{
    res.send('<h1>Bem-vindo!</h1>');
})


mongoose.set('strictQuery', false)

mongoose.connect('mongodb://127.0.0.1:27017/escola').then(res=>{

    console.log('Banco conectado');

    app.get('/professores/:nome', async(req,res)=>{
        
        let nome = req.params.nome;

        try{
            let professor = await Professor.find({nome})
            res.send(professor);
        }catch(err){
            console.log(err)
        }
        
    })

}).catch(err=>{
    console.log(err);
})

app.listen(3000, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Servidor rodando na porta 3000');
    }
})