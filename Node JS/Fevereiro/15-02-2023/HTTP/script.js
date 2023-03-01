// const http = require('http');

// http.createServer((request, response)=>{

//     response.writeHead(200, {'Content-Type': 'application/json'})
//     response.end("Ok");

// }).listen(3000, (err)=>{
//     if(err){console.log(err)}
//     else{
//         console.log("Servidor Rodando na porta 3000");
//     }
// })

const http = require('http');
const url = require('url');
const fs = require('fs');

function problem(err){
    if(err){
        console.log(err);
    }else{
        console.log('Servidor criado com sucesso!');
    }
}

http.createServer((request, response)=>{
    
    let path = url.parse(request.url).pathname;
    let file_name = "." + path;


    fs.readFile(file_name, (err, data){
        if(err){
            response.writeHead(404, {"Content-Type" : "text/html"});
            
        }
    })


}).listen(3000, problem(err))

// http.createServer((req, res)=>{
//     utl.pathname
//     let path = url.parse(req.url).pathname;
//     let fileName = "." + path;

//     fs.readFile(fileName, (err, data)=>{
//         if(err){
//             res.writeHead(404, {"Content-Type" : "text/html"});
//             res.end("<h1>Página não encontrada</h1>")
//         }else{
//             res.writeHead(200, {"Content-Type" : "text/html"})
//             res.write(data);
//             res.end();
//         }
//     })

//     res.writeHead(200, {'Content-Type': 'text/html'})
//     res.end();

// }).listen(4000, (err)=>{
//     if(err){throw(err)}
//     console.log("Servidor rodando na porta 4000");
// })


// let sba = {
//     ok: true
// }

// console.log(carro);

// let carro_cod = JSON.stringify(carro);

// console.log(carro_cod);

// console.log(JSON.parse(carro_cod));