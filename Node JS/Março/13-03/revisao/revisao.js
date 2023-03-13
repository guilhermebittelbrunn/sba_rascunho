let Produtos = [
    {
        titulo: 'Leite',
        preco: 5.00,
        categoria: 'alimento',
        status: {
            estoque: true,
            ativo: true
        }
    },
    {
        titulo: 'Banana',
        preco: 3.00,
        categoria: 'alimento',
        status: {
            estoque: true,
            ativo: true
        }
    },
    {
        titulo: 'Bolacha',
        preco: 3.00,
        categoria: 'alimento',
        status: {
            estoque: false,
            ativo: true
        }
    },
    {
        titulo: 'Papel-higiênico',
        preco: 12.00,
        categoria: 'higiene',
        status: {
            estoque: true,
            ativo: true
        }
    },
    {
        titulo: 'Caderno',
        preco: 20.00,
        categoria: 'papelaria',
        status: {
            estoque: false,
            ativo: false
        }
    },
    {
        titulo: 'Sorvete',
        preco: 15.00,
        categoria: 'alimento',
        status: {
            estoque: false,
            ativo: true
        }
    },
    {
        titulo: 'Detergente',
        preco: 7.0,
        categoria: 'higiene',
        status: {
            estoque: true,
            ativo: false
        }
    },
]


console.table(Produtos);

// MAP 

console.log(Produtos.map(item=> `${item.titulo} por apenas: R$${item.preco.toFixed(2)}`));

// FILTER 

console.log(Produtos.filter(item => item.preco>=15).filter(item => item['categoria'] == 'alimento'));

//  FIND

console.log(Produtos.find(item => item.preco < 5));
console.log("Index: "+ Produtos.findIndex(item => item.preco < 5));

// REDUCE

console.log(Produtos.reduce((acc, p)=>{
    acc += p.preco;
    return acc;
},0))

console.log(Produtos.reduce((acc,p)=>{
    acc.push(p.titulo);
    return acc;
},[]))

console.log(Produtos.reduce((acc,p)=>{
    if(!acc[p.status.estoque]) acc[p.status.estoque] = [];
    acc[p.status.estoque].push(p);
    return acc
},{}))

console.log(Produtos.reduce((acc,p)=>{
    acc += '\n' + '\n' + p.titulo
    return acc
}, ''))

function agrupar(parametro){
    return Produtos.reduce((acc,p)=>{
        if(!acc[p[parametro]]) acc[p[parametro]] = [];
        acc[p[parametro]].push(p);
        return acc
    },{})
}


console.log(agrupar('categoria'));

ty