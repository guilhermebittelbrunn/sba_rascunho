let produtos = [
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
        preco: 4.00,
        categoria: 'alimento',
        status: {
            estoque: false,
            ativo: true
        }
    },
    {
        titulo: 'Papel-higiênico',
        preco: 12.00,
        categoria: 'higiêne',
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
        categoria: 'higiêne',
        status: {
            estoque: true,
            ativo: false
        }
    },
]


console.log('Lista de produtos: ' + produtos.map(p => p.titulo));
console.log('Lista de alimentos:', produtos.filter(p => p.categoria ==='alimento').filter(p => p.preco >= 5).filter(p => p.status.estoque));
console.log('Itens por inativos:', produtos.reduce((acc,p)=>{
    if(!acc.categoria){
        acc. = []
    }
    acc.categoria.push(p);
    return acc;
},{}));
