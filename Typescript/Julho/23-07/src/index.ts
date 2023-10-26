// enum situacao {
//     aprovado,
//     reprovado,
//     exame,
// }
// enum turno {
//     matutino,
//     vespertino,
//     noturno,
// }

import { NoSubstitutionTemplateLiteral } from "typescript";

// interface Aluno {
//     id: number;
//     nome: string;
//     idade: number;
//     turno: string | number;
//     situacao: string | number;
// }

// const Alumns: Aluno[] = [
//     {
//         id: 1,
//         nome: "Guilherme",
//         idade: 16,
//         turno: turno[0],
//         situacao: situacao.aprovado,
//     },
//     {
//         id: 2,
//         nome: "Roseli",
//         idade: 14,
//         turno: turno[1],
//         situacao: situacao.aprovado,
//     },
//     {
//         id: 3,
//         nome: "Ivan",
//         idade: 18,
//         turno: turno[2],
//         situacao: situacao.reprovado,
//     },
//     {
//         id: 4,
//         nome: "Jessica",
//         idade: 17,
//         turno: turno[1],
//         situacao: situacao.aprovado,
//     },
//     {
//         id: 5,
//         nome: "Camilly",
//         idade: 19,
//         turno: turno[0],
//         situacao: situacao.exame,
//     },
// ];

// // const listFilter: any = Alumns.reduce((acc: any, alumn: Aluno) => {
// //     if (!acc[alumn.turno]) {
// //         acc[alumn.turno] = [];
// //     }
// //     acc[alumn.turno].push(alumn);
// //     return acc;
// // }, []);

// const listFilter = (list: Aluno[], filterValue: string | number) => {
//     let newList = list.reduce((acc: any, item: any) => {
//         if (!acc[item[filterValue]]) {
//             acc[item[filterValue]] = [];
//         }
//         acc[item[filterValue]].push(item);
//         return acc;
//     }, []);
//     return newList;
// };

// const newList: any = listFilter(Alumns, "situacao");
// newList.map((item: any) => {
//     console.log(`Lista de alunos com a situação ${item[0].situacao}:`);
//     return console.log(item);
// });

let val1: number = 10;
let val2: string = String(val1);

console.log(`Number: ${val1} String ${val2}`);
