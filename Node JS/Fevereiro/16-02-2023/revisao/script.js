//tratando imagens

const image_function = require('./function');

// let inputPath = process.argv[2];
// let width = parseInt(process.argv[3]);


// image_function.resize(inputPath, 'novaimagem.jpg', width);


//HTTP

const http = require('http');

class Carro{

    constructor(modelo, marca, ano){
        this.modelo = modelo;
        this.marca = marca;
        this.ano = ano;
    }

    info(){
        console.log(this.modelo, this.marca, this.ano);
    }

}

let veronica = new Carro('cerato','kia',2012);
let veronicajson = JSON.stringify(veronica);


http.createServer((request, response)=>{

    response.writeHead(200, {'Content-type' : 'application/json'});
    response.end(veronicajson);

}).listen(5050, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Porta criada com sucesso");
    }
});