document.addEventListener('DOMContentLoaded', ()=>{
    exibirProdutos();
})


function exibirProdutos(){ 
    fetch('http://localhost:3000/produto').then(res=>{
        return res.json();
    }).then(data=>{
        let lista_produtos = document.getElementById('lista_produtos');
        let filter_select = document.getElementById('filter_select'); 
        let ul = '<ul>'
        let select = '<select id="select_field"> <option value="todos">todos</option>'
        data.forEach(element=>{
            ul += `
                <li>
                    <div class="card" id="${element.id}">
                        <h2>${element.nome}</h2>
                        <p>${element.descricao}</p>
                        <h3>R$: ${element.preco}</h3>
                        <button onclick="deletarProduto(this)">X</button>
                        <button onclick="aumentarPreco(this)">+</button>
                        <button onclick="diminuirPreco(this)">-</button>
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
    let id = element.parentElement.id;
    const options = {
        method: 'delete'
    }
    fetch('http://localhost:3000/produto/' + id, options).then(res=>{
        exibirProdutos();
    })
}

function buscarProduto(){
    let filter_select = document.getElementById('select_field').value;

    fetch('http://localhost:3000/produto/' + filter_select).then(res=>{
        return res.json();
    }).then(data=>{
        let ul = '<ul>'
        let lista_produtos = document.getElementById('lista_produtos');
        data.forEach(element=>{
            ul += `
                <li>
                    <div class="card" id="${element.id}">
                        <h2>${element.nome}</h2>
                        <p>${element.descricao}</p>
                        <h3>R$: ${element.preco}</h3>
                        <button onclick="deletarProduto(this)">X</button>
                        <button onclick="aumentarPreco(this)">+</button>
                        <button onclick="diminuirPreco(this)">-</button>
                    </div>
                </li>
                `
        })
        lista_produtos.innerHTML = ul + '</ul>';
    })

}

function aumentarPreco(element){
    let id = element.parentElement.id;

    const options = {
        method: 'put'
    }

    fetch('http://localhost:3000/produto/aumentar/' + id, options).then(res=>{

        exibirProdutos();
    })
}

function diminuirPreco(element){
    let id = element.parentElement.id;

    const options = {
        method: 'put'
    }

    fetch('http://localhost:3000/produto/diminuir/' + id, options).then(res=>{

        exibirProdutos();
    
    })
}
