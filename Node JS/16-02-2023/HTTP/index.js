const http = require('http');
const fs = require('fs');
const url = require('url');


let server = process.argv[2];
let document = process.argv[3] + '.txt';
let text = process.argv[4];

function createText(document, text) {
    fs.writeFile(document, text, (err) => {
        if (err) { throw (err); }
        else {
            console.log('Documento de texto criado com sucesso');
            createServer(server, document);
        }
    })
}


function createServer(server, path){

    http.createServer((require,response)=>{

        fs.readFile(path, 'utf-8', (err, data)=>{
            if(err){
                response.writeHead(404, {'Contet-Type':'text/plain'});
                response.write("Página não encotrada");
                response.end();
            }
            else{
                response.writeHead(200, {'Content-Type':'text/plain'});
                response.write(data.toUpperCase());
                response.end();
            }
        })


    }).listen(server, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Servidor rodando na porta: ' + server);
        }
    })

}

createText(document, text);


// http.createServer((request, response)=>{

//     let path = url.parse(request.url).pathname;
//     let file = "." + path;

//     fs.readFile('text.txt', (err, data)=>{

//         if(err){
//             response.writeHead(404, {"Content-Type":"text/html;charset=utf-8"});
//             response.write('<h1>Página não encontrada</h1>');
//             response.end();
//         }else{
//             response.writeHead(200, {"Content-Type":"text/html"});
//             response.write(data);
//             response.end();
//         }
//     })

// }).listen(3030, (err=>{
//     if(err)
//     {
//         console.log(err);
//     }else{
//         console.log('Servidor criado com sucesso!');
//     }
// }))