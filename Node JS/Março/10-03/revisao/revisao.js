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


// console.log('Lista de produtos: ' + produtos.map(p => p.titulo));
// console.log('Lista de alimentos:', produtos.filter(p => p.categoria ==='alimento').filter(p => p.preco >= 5).filter(p => p.status.estoque));


let grupo2 = produtos.reduce((acc,produto)=>{
    if(!acc[produto.categoria]){
        acc[produto.categoria] = [];
    }
    acc[produto.categoria].push(produto);
    return acc;
}, {} );

console.log(grupo2.alimento == grupo2['alimento']);
grupo2['bebidas'] = [{titulo: 'Coca-cola', preco: 8.0, categoria: 'bebida', status:{estoque: true, ativo:false}}];
console.log(grupo2)

// let alunos = [

//     {matutino: [ {nome: 'Guilherme', idade: 20}, {nome: 'Roseli', idade: 16} ],},
//     {noturno: [ {nome: 'Jéssica', idade: 30}, {nome: 'Ivan', idade: 15} ]}

// ]

// let alunos = {

//     matutino: [ {nome: 'Guilherme', idade: 20}, {nome: 'Roseli', idade: 16} ],
//     noturno: [ {nome: 'Jéssica', idade: 30}, {nome: 'Ivan', idade: 15} ]

// }


