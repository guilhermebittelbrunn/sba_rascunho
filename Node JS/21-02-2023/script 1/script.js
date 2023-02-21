const express = require('express');
const app = express();
const PORT = 3000;


// app.get('/', (req,res)=>{
//     res.set('text/html');
//     res.send('<h1>Página inicial</h1>');
// })

// app.get('/alunos', (req,res)=>{
//     let alunos = [
//         {id: 1, nome: 'Guilherme'},
//         {id: 2, nome: 'Arthur'},
//         {id: 3, nome: 'Tatiane'}
//     ]
//     let query = req.query;
//     res.set('application/json');

//     if(query.id === undefined && query.nome === undefined){
//         res.send(alunos);
//     }
//     else if(query.id != undefined){

//         let AlunoID = alunos.filter((aluno)=>{
//             return aluno.id == query.id;
//         });

//         res.send(AlunoID); 
//     }else{
        
//         let AlunoNOME = alunos.filter((aluno)=>{
//             return aluno.nome == query.nome;
//         })

//         res.send(AlunoNOME);

//     }
// })

// app.listen(PORT, (err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('Servidor rodando na porta: ' + PORT);
//     }
// })


let alunos = [
    {id: 1, nome: 'Guilherme', idade: 20},
    {id: 2, nome: 'Arthur', idade: 19},
    {id: 3, nome: 'Tatiane', idade: 25}, 
]

let carro = {
    marca: 'Kia',
    ano: '2012',
    itens: ['ar condicionado', 'videoeletrico'],
    falarmarca: ()=>{
        console.log(this.marca)
    }
}

//1a
let alunosMenoresde20 = alunos.filter((element)=>{
    return element.idade >= 20;
})

//2a
let inicialAluno = function(item){
    return item.nome[0] == 'G';
}

let alunosInicial = alunos.filter(inicialAluno);

//3a
function maiorid(cabeçudos){
    return cabeçudos.id > 1;
}

let alunosIDmaior = alunos.filter(maiorid);

//1b

let IdNome = alunos.map((aluno)=>{
    return `ID:${aluno.id} pertece a ${aluno.nome}`;
})

//2b

function NomeIdade(element){
    return `Aluno: ${element.nome} tem ${element.idade} anos`
}

function AlunosIdade(){
    console.log(`Lista de alunos por ID e Nome:\n ${alunos.map(NomeIdade)}\n`);

}

console.log("Alunos menores que 20 anos:\n" + JSON.stringify(alunosMenoresde20)+ '\n');
console.log("Alunos com a inicial do nome com a letra 'G'\n" + JSON.stringify(alunosInicial) + '\n');
console.log("Alunos com o ID maior que 1\n" + JSON.stringify(alunosIDmaior)+ '\n');

setTimeout(()=>{
    console.log(`Lista de alunos por ID e Nome:\n ${IdNome}\n`)
}, 3000);

setTimeout(AlunosIdade, 5000);


listaA = [1,2,3,4,5];
listaB = [6,7,8,9,0];

listaC = [...listaA,...listaB];
console.log(listaC);