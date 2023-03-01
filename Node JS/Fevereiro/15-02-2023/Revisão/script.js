let calc = require('./calc');
let fs = require('fs');
let args = process.argv.slice(2);

let valor1= parseInt(args[0]);
let valor2= parseInt(args[1]);

let text = `Os resultados são:
\n${calc.soma(valor1,valor2)}
\n${calc.sub(valor1,valor2)} 
\n${calc.mult(valor1,valor2)} 
\n${calc.div(valor1,valor2)}`



CriarTexto('revisão.txt');
CriarTextoMaiusculo('revisão.txt', 'revisão_upper.txt');

excluir_timer('revisão_upper.txt', 5000);
excluir_timer('revisão.txt', 8000);



function CriarTexto(documento){
    fs.writeFile(documento, text, (error)=>{
        if(error){throw(error)}
        console.log('Arquivo resultado criado');
    })
}

function CriarTextoMaiusculo(texto, documento){
    fs.readFile(texto, 'utf-8', (error,data)=>{
        if(error){throw(error)}
        fs.writeFile(documento, data.toUpperCase(), (error)=>{
            if(error){throw(error);}
            console.log('Arquivo criado com sucesso');
        })
    })
}


function apagar_documento(documento){
    fs.unlink(documento, (error)=>{
        if(error){throw(error)}
        console.log(`${documento} excluído com sucesso`);
    })
}

function excluir_timer(documento, tempo){
    setInterval(()=>{
        apagar_documento(documento);
    }, tempo);
}

