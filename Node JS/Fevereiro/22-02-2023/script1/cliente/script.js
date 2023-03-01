
document.addEventListener('DOMContentLoaded', ()=>{
    Listar();
})

let Listar = function(){

    fetch('http://localhost:4000/cliente/noticias').then(res=>{
        return res.json();
    }).then(json=>{
        let manchete = ''
        let elementos = JSON.parse(json);
        elementos.forEach((elemento)=>{
            let noticia = `
                <div class="card" onclick="Atualizar(this)" id="${elemento.id}">
                    <div class="card-header">
                        <h2>${elemento.titulo}</h2>
                    </div>
                <div class="card-body">
                    <p>${elemento.descricao}</p>
                    </div>
                </div>
            `
            manchete += noticia;
        })
        document.getElementById("manchete").innerHTML = manchete;
    })

}

let Adicionar = function(){

    let titulo = document.getElementById('titulo').value;
    let descricao = document.getElementById('descricao').value;

    let notica = {
        titulo: titulo,
        descricao: descricao
    }

    const options = {
        method: "POST",
        headers: new Headers({'content-type':'application/json'}),
        body: JSON.stringify(notica)
    }

    fetch('http://localhost:4000/cliente/noticias', options).then(res=>{
        Listar();
        document.getElementById('titulo').value = '';
        document.getElementById('descricao').value = '';
    })

}

let Apagar = function(elemento){

    let id = elemento.id;
    const options = {
        method: "DELETE"
    }

    fetch('http://localhost:4000/cliente/noticias/' + id, options).then(res=>{
        Listar();
    })

}

let Atualizar = function(elemento){
    
    let id = elemento.id

    const options = {
        method: "put"
    }

    fetch('http://localhost:4000/cliente/noticias/' + id, options).then(res=>{
        Listar();
    })
}