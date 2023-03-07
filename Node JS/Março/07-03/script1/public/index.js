document.addEventListener('DOMContentLoaded', ()=>{
    exibirProdutos();
})


function exibirProdutos(){
    
    fetch('http://localhost:3000/produto').then(res=>{
        return res.json();
    }).then(data=>{
        let section = document.getElementById('lista_produtos');
        let ul = '<ul>'
        data.forEach(element=>{
            ul += `
                <li>
                    <div class="card" id="${element.id}">
                        <h2>${element.nome}</h2>
                        <p>${element.descricao}</p>
                        <h3>${element.preco}</h3>
                        <button onclick="deletarProduto(this)">X</button>
                    </div>
                </li>
        `
        })
        section.innerHTML = ul + '</ul>';
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


function editarProduto(){
    
}
