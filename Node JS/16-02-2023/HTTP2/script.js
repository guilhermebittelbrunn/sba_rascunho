const http = require('http');
const fs = require('fs');
const url = require('url');

const teste = {
    ok: true
}


http.createServer((req,res)=>{
    
    let path = url.parse(req.url).pathname;
    let file = '.' + path;

    fs.readFile(file, (err,data)=>{
        if(err){
            res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'});
            res.write("<h1>Página não encontrada</h1>")
            res.end();
        }else{
            res.writeHead(200, {'Content-Text' : 'application/json'});
            res.write(JSON.parse(data));
            res.end();
        }
    })


    res.writeHead(200, {'Content-Text': 'application/json'})
    res.write(JSON.stringify(teste));
    res.end();

}).listen(3000, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Servidor rodando na porta 3000");
    }
})