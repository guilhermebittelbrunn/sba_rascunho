const fs = require('fs');
const Pessoas = [
    {
        nome: "Guilherme",
        idade: 20
    },
    {
        nome: "Jessica",
        idade: 30
    },
    {
        nome: "Roseli",
        idade: 52
    },
    {
        nome: "Ivan",
        idade: 57
    },
    {
        nome: "Camilly",
        idade: 19
    },
    {
        nome: "Heloísa",
        idade: 18
    },
    {
        nome: "Matheus",
        idade: 30
    },
]

function deleteArq(name){
    fs.unlink(name, (err)=>{
        if(err) console.log(err);
        else console.log(`Arquivo ${name} deletado com sucesso`);
    })
}

let nomes = Pessoas.reduce((acc,p)=>{
    acc += `${p.nome} ${p.idade} \n`;
    return acc;
},'')



fs.writeFile('ListaDePessoas.csv', nomes, (err)=>{
    if(err) console.log(err);
    else console.log('Arquivo criado com sucesso!')
})

fs.readFile('ListaDePessoas.csv', 'utf-8', (err,data)=>{
    if(err) console.log(err);
    else{
        fs.writeFile('Pessoas.txt', data.toLocaleUpperCase(), (error)=>{
            if(error){
                console.log(error);
            }else{
                console.log('Arquivo .txt criado com sucesso!');
            }
        })
    }
})

setTimeout(()=>{
    deleteArq('ListaDePessoas.csv');
    deleteArq('Pessoas.txt')
}, 15000);

