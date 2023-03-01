const http = require('http');
const fs = require('fs');
const url = require('url');
const objeto = require('./teste.js');

// function createContent(filename){
//     fs.writeFile(filename, 'teste = {ok : true}', (err)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.log('Arquivo criado com sucesso');
//             createServer();
//         }
//     })
// }

function createServer(){
    http.createServer((req,res)=>{

        let pathname = url.parse(req.url).pathname;
        let filepath = '.' + pathname +'.js';

        fs.readFile(filepath, (err, data)=>{
            if (err){
                res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'});
                res.write('<h1>Página não encotrada</h1>');
                res.end();
            }else{
                res.writeHead(200, {'Content-Type' : 'application/json'});
                res.write(data);
                res.end();
            }
        })

    }).listen(4000, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Servidor criado na porta 4000');
        }
    })
    console.log(objeto);
    console.log(JSON.stringify(objeto))
}


createServer();



// http.createServer((req,res)=>{
    
//     let path = url.parse(req.url).pathname;
//     let file = '.' + path;

//     fs.readFile(file, (err,data)=>{
//         if(err){
//             res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'});
//             res.write("<h1>Página não encontrada</h1>")
//             res.end();
//         }else{
//             console.log(JSON.stringify(data));
//             var objeto = data;
//             res.writeHead(200, {'Content-Text' : 'application/json'});
//             res.write(data);
//             res.end();
//         }
//     })

//     console.log(JSON.stringify(objeto))
//     console.log('teste');

// }).listen(3000, (err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Servidor rodando na porta 3000");
//     }
// })


