
function exibirProdutos(){ 
    fetch('http://localhost:3000/produto').then(res=>{
        return res.json();
    }).then(data=>{
        const lista_produtos = document.getElementById('lista_produtos');
        const filter_select = document.getElementById('filter_select'); 
        let select = '<select id="select_field"> <option value="todos">todos</option>'
    
        criarElementos(data, lista_produtos);
        data = data.reduce((acc, produto)=>{
            if(!acc.find(item => item === produto.categoria)){
                acc.push(produto.categoria);
            }
            return acc;
        },[])
        data.forEach(element=>{
            select += `<option value="${element}">${element}</option>`
        })
        
        filter_select.innerHTML = select + "</select>" + "<button onclick='buscarProduto()'>Buscar</button>";
    })
}

function criarElementos(data, local){
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
    local.innerHTML = ul + '</ul>';
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
        criarElementos(data, lista_produtos);
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
    element.removeAttribute('onclick');
    const id = card.id;
    const edit = 
        `
        <form action="/produto/editar/${id}" method='post'>
        <input type='text' name="nome" value='${card.getAttribute('nome')}' id='edit_nome' placeholder="${card.getAttribute('nome')}">
        <input type='text' name="descricao" id='edit_descricao' placeholder="descrição">
        <button>Salvar</button>
        </form>
        `
    card.innerHTML += edit
}

