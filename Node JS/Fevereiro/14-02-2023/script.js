//teste 1

// console.log("Hello World");


// let a = 10
// let b = 5

// var soma2 = function(a, b){
//     console.log(a + b)
// }

// console.log(`Resultado: ${soma(a,b)}`);
// console.log(`Resultado: ${soma(a,b)}`);

// teste 2

// let lista = process.argv.slice(2);

// let valor1 = parseInt(lista[0]);
// let valor2 = parseInt(lista[1]);
// let op = lista[2];

// function soma(a, b){
//     return valor1 + valor2;
// }

// function mult(a, b){
//     return valor1 * valor2;
// }

// if (op == 's'){
//     op = soma(valor1,valor2);
// }else if(op == 'm'){
//     op = mult(valor1,valor2);
// }else{
//    op = "Opção inválida";
// }

// console.log(op);

// teste 3

// let calc = require("./funcoes");

// console.log("Total: " + calc.soma(5,6));

// teste 4 

// let fs = require('fs');

// let problem = function(error){
//     if (error){throw error};
//     console.log("Ação realizada com sucesso!")
// }

// let leitura = function(error, data){
//     if (error){throw error}
//     console.log(data + "\n fim do texto");
// }

// // fs.writeFile("proj.txt", "Hello World!", function(error){
// //     if (error){throw error}
// //     console.log("feito");
// // });

// fs.readFile("Nova linha.txt", "UTF8", leitura);

console.log(process.argv);
let args = process.argv.slice(2);
let fs = require('fs');

let name = args[0];
let text = args[1];

let erros = require("./erros");

fs.writeFile(name, text, erros.problem);


fs.writeFile(name, text, erros.problem)

fs.readFile(name,"utf-8", (error, data)=>{
    if(error){throw error}
    fs.writeFile(name + "_upper", data.toUpperCase(), erros.problem)
})