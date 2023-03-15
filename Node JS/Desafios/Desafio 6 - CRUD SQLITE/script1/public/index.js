
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
        
        filter_select.innerHTML = select + "</select>" + "<button onclick='buscarProdutos()'>Buscar</button>";
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
                    <button onclick="alterarPreco(this)" id='adc'>+</button>
                    <button onclick="alterarPreco(this)"  id='sub'>-</button>
                    <button onclick="editarProduto(this)">✏️</button>
                </div>
            </li>
            `
    })
    local.innerHTML = ul + '</ul>';
}
    
function deletarProduto(element){
    const id = element.parentElement.id;
    fetch('http://localhost:3000/produto/' + id, {method:'delete'}).then(res=>{
        buscarProdutos();
    })
}

function buscarProdutos(){

    const filter_select = document.getElementById('select_field').value;
    
    fetch('http://localhost:3000/produto/' + filter_select).then(res=>{
        return res.json();
    }).then(data=>{
        const lista_produtos = document.getElementById('lista_produtos');
        criarElementos(data, lista_produtos);
    })
}

function alterarPreco(element){
    const id = element.parentElement.id;
    const op = element.id;
    
    fetch('http://localhost:3000/produto/alterar/?' + `id=${id}&op=${op}`, {method: 'put'}).then(res=>{
        buscarProdutos();
    })
}

function editarProduto(element){
    const card = element.parentElement;
    const nome = element.parentElement.children[0].textContent;
    const descricao = element.parentElement.children[1].textContent;
    const id = card.id;

    element.removeAttribute('onclick');
    
    const edit_field = 
        `
        <form action="/produto/editar/${id}" method='post'>
        <input type='text' name="nome" value='${nome}' id='edit_nome' placeholder="Produto">
        <input type='text' name="descricao" value="${descricao}" id='edit_descricao' placeholder="Descrição">
        <button>Salvar</button>
        </form>
        `
    card.innerHTML += edit_field;
}

