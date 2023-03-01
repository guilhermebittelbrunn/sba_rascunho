const sharp = require('sharp');
const compress_images = require('compress-images');

let path = process.argv[2];
let width = parseInt(process.argv[3]);

function resize(inputPath, outputPath, width) {

    sharp(inputPath).resize({ width: width }).toFile(outputPath, (error) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Imagem redimensionada com sucesso");
            // compress(outputPath, './compress/');
            rotacionar(outputPath, 90);
        }
    });
}

function rotacionar(outputPath, angle){
    sharp(outputPath).rotate(angle).toFile("imagemrotacionada.jpg", (err)=>{
        if(err){console.log(err)}
        else{console.log("Imagem rotacionada")}
    })
}

// function compress(pathInput, pathOutpath) {
//     compress_images(pathInput, pathOutpath, { compress_force: false, statistic: true, autoupdate: true }, false,
//         { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
//         { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
//         { svg: { engine: "svgo", command: "--multipass" } },
//         { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
//         function (error, completed, statistic) {
//             console.log("-------------");
//             console.log(error);
//             console.log(completed);
//             console.log(statistic);
//             console.log("-------------");
//         }
//     );
// }


resize(path, 'novaimagem.jpg', width);

