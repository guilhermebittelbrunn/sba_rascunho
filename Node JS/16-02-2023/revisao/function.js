const sharp = require('sharp');
const fs = require('fs');
const image_function = {

    resize: (inputPath, outputPath, width) =>{

        sharp(inputPath).resize({width : width}).toFile(outputPath, (err)=>{
            if(err){
                console.log(err);
            }else{
                console.log('Imagem redimensionada com sucesso');
                image_function.rotacion(outputPath, "rotate" + outputPath, 90);
                image_function.cleanarq(outputPath, 8000);
                image_function.cleanarq('rotate' + outputPath, 4000);
                
            }
        });
        
    },
    
    rotacion: (outputPath, file ,angle)=>{
        sharp(outputPath).rotate(angle).toFile(file, image_function.problem("Imagem rotacionada com sucesso"));
    },
    
    problem: (err, message)=>{
        if(err){
            console.log(err);
        }else{
            console.log(message);
        }
    },
    
    
    cleanarq: (outputPath, timer)=>{
        setTimeout(()=>{
            fs.unlink(outputPath, (err)=>{
                if(err){throw(err);}
                else{
                    console.log(`${outputPath} apagado com sucesso`);
                }
            }) 
        }, timer);
    }
}

module.exports = image_function;