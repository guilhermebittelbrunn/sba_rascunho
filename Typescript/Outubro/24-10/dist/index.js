"use strict";
// import {Aluno, Alunos, periodo} from './Aluno'
Object.defineProperty(exports, "__esModule", { value: true });
// function filtrarAlunos<T extends keyof Aluno>(listaAlunos:Aluno[], filtro:T){
//     return listaAlunos.reduce((acc: {[index:string]: Aluno[]}, aluno: Aluno)=>{
//         if(filtro in aluno){
//             if(acc[aluno[filtro]] === undefined){
//                 acc[aluno[filtro]] = [];
//             }
//             acc[aluno[filtro]].push(aluno);
//         }
//         return acc
//     }, {})
// }
// const alunosPeriodo = filtrarAlunos(Alunos, 'periodo');
// for(let key in alunosPeriodo){
//     console.log(`--- ${periodo[+key]} ---`);
//     console.table(alunosPeriodo[key]);
// }
const Aluno_1 = require("./Aluno");
function filtrarAlunos(listaAlunos, filtro) {
    const novaLista = listaAlunos.reduce((acc, aluno) => {
        if (acc[aluno[filtro]] === undefined) {
            acc[aluno[filtro]] = [];
        }
        acc[aluno[filtro]].push(aluno);
        return acc;
    }, {});
    return novaLista;
}
const alunosPorPeriodo = filtrarAlunos(Aluno_1.Alunos, 'situacao');
console.log(alunosPorPeriodo);
// for(let key in alunosPorPeriodo){
//     console.log(`=== ${periodo[+key]} ===`);
//     console.table(alunosPorPeriodo[key]);
// }
// function sayMyName(name:string):string{
//     return name
// }
// function gretting(fn:(name:string)=>string, name:string):string{
//     const fullName = `${fn(name)} Souza`;
//     return fullName
// }
// console.log(`Olá, ${gretting(sayMyName, 'Jonathan')}`);
// class Employee{
//     public name:string
//     public age:number
//     private genre: 'M' | 'F'
//     constructor(nome:string, idade:number, genero:'M'|'F'){
//         this.name = nome,
//         this.age = idade,
//         this.genre = genero
//     }
//     getName():string{
//         return this.name
//     }
//     setName(name:string):void{
//         this.name = name
//     }
//     getGenre():string{
//         return this.genre
//     }
// }
// class Admin extends Employee{
//     private admin: boolean
//     constructor(isAdmin:boolean, nome:string, idade:number, genero:'M'|'F'){
//         super(nome, idade, genero);
//         this.admin = isAdmin;
//     }
//     getAdmin(){
//         return this.admin
//     }
//     setAge(idade:number){
//         this.age = idade
//     }
// }
// const Guilherme = new Employee('Guilherme', 19, 'M');
// const Renato = new Admin(true, 'Renato', 19, 'M');
// console.log('Guilherme', Guilherme)
// console.log('Renato', Renato)
// console.log('does Renato is admin?', Renato.getAdmin());
