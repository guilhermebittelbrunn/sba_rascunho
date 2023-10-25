"use strict";
// import {Aluno, Alunos, periodo} from './Aluno'
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
// interface Veiculo{
//     marca: string,
//     year: number,
//     onSale: boolean
//     mostrarDetalhes: string
// }
// const Cerato:any = {
//     marca: "Kia",
//     year: 2012,
//     onSale: false,
//     mostrarDetalhes: ():void=>{
//         console.log(Cerato.marca)
//     }
// }
// function sayMyName(name:string):string{
//     return name
// }
// function gretting(fn:(name:string)=>string, name:string):string{
//     const fullName = `${fn(name)} Souza`;
//     return fullName
// }
// console.log(`Olá, ${gretting(sayMyName, 'Jonathan')}`);
class Employee {
    constructor(nome, idade, genero) {
        this.name = nome,
            this.age = idade,
            this.genre = genero;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getGenre() {
        return this.genre;
    }
}
class Admin extends Employee {
    constructor(isAdmin, nome, idade, genero) {
        super(nome, idade, genero);
        this.admin = isAdmin;
    }
    getAdmin() {
        return this.admin;
    }
}
const Guilherme = new Employee('Guilherme', 19, 'M');
const Renato = new Admin(true, 'Renato', 19, 'M');
console.log('Guilherme', Guilherme);
console.log('Renato', Renato);
console.log('does Renato is admin?', Renato.getAdmin());
