let path = process.argv[2];
let width = parseInt(process.argv[3]);

const sharp = require('sharp');


function resize(path, width){

    sharp(path).resize({width: width}).toFile('./testandoimagem.jpg', (error)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("Imagem redimencionada com sucesso");
        }
    });
}


resize(path, width);