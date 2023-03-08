
function exibirProdutos(){ 
    fetch('http://localhost:3000/produto').then(res=>{
        return res.json();
    }).then(data=>{
        const lista_produtos = document.getElementById('lista_produtos');
        const filter_select = document.getElementById('filter_select'); 
        let ul = '<ul>'
        let select = '<select id="select_field"> <option value="todos">todos</option>'
        data.forEach(element=>{
            ul += `
                <li>
                    <div class="card" id="${element.id}" nome="${element.nome}">
                        <h2>${element.nome}</h2>
                        <p>${element.descricao}</p>
                        <h3>R$: ${element.preco}</h3>
                        <button onclick="deletarProduto(this)">X</button>
                        <button onclick="aumentarPreco(this)">+</button>
                        <button onclick="diminuirPreco(this)">-</button>
                        <button onclick="editarProduto(this)">✏️</button>
                    </div>
                </li>
                `
            select += `<option value="${element.nome}">${element.nome}</option>`
        })
        lista_produtos.innerHTML = ul + '</ul>';
        filter_select.innerHTML = select + "</select>" + "<button onclick='buscarProduto()'>Buscar</button>";
    })
}

function deletarProduto(element){
    const id = element.parentElement.id;
    const options = {
        method: 'delete'
    }
    fetch('http://localhost:3000/produto/' + id, options).then(res=>{
        buscarProduto();
    })
}

function buscarProduto(){

    const filter_select = document.getElementById('select_field').value;
    
    fetch('http://localhost:3000/produto/' + filter_select).then(res=>{
        return res.json();
    }).then(data=>{
        const lista_produtos = document.getElementById('lista_produtos');
        let ul = '<ul>'
        data.forEach(element=>{
            ul += `
                <li>
                    <div class="card" id="${element.id}" nome="${element.nome}">
                        <h2>${element.nome}</h2>
                        <p>${element.descricao}</p>
                        <h3>R$: ${element.preco}</h3>
                        <button onclick="deletarProduto(this)">X</button>
                        <button onclick="aumentarPreco(this)">+</button>
                        <button onclick="diminuirPreco(this)">-</button>
                        <button onclick="editarProduto(this)">✏️</button>
                    </div>
                </li>
                `
        })
        lista_produtos.innerHTML = ul + '</ul>';
    })
}

function aumentarPreco(element){

    const id = element.parentElement.id;
    const options = {
        method: 'put'
    }

    fetch('http://localhost:3000/produto/aumentar/' + id, options).then(res=>{
        buscarProduto();
    })
}

function diminuirPreco(element){

    const id = element.parentElement.id;
    const options = {
        method: 'put'
    }

    fetch('http://localhost:3000/produto/diminuir/' + id, options).then(res=>{
        buscarProduto();
    })
}

function editarProduto(element){
    const card = element.parentElement;
    const id = card.id;
    const edit = 
        `
        <form action="/produto/editar/id:${id}">
        <input type='text' value='${card.getAttribute('nome')}' id='edit_nome' placeholder="${card.getAttribute('nome')}">
        <input type='text' value='' id='edit_descricao' placeholder="descrição">
        <button type="submit">Salvar</button>
        </form>
        `
    card.innerHTML += edit
    
}

// function salvarAlteracoes(id){

//     console.log('salvo', id);

//     let nome = document.getElementById('edit_nome').value;
//     let descricao = document.getElementById('edit_descricao').value

//     let produto = {
//         nome: nome,
//         descricao: descricao
//     }
//     console.log(produto);

//     const options = {
//         method: 'put',
//         header: new Headers({'content-type':'application/json'}),
//         body: JSON.stringify(produto)
//     }


//     fetch('http://localhost:3000/produto/editar/' + id, options).then(res=>{
//         console.log('enviado');
//     })
// }
