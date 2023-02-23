
document.addEventListener('DOMContentLoaded', ()=>{
    Exibir();
})

let Exibir = function(){

    fetch('http://localhost:4000/news/noticias').then(res=>{
        return res.json();
    }).then(json=>{
        manchete = '';
        elementos = JSON.parse(json);
        elementos.forEach((elemento)=>{
            let noticia = `
            <div class="card">
                <div class="card-header">
                    <h3>${elemento.titulo}</h3>
                </div>
                <div class="card-body">
                    <p>${elemento.descricao}</p>
                </div>
            </div>
            `
            manchete += noticia;
        })
        document.getElementById('section-notices').innerHTML = manchete;
    })
    
}


function Adicionar(){

    let titulo = document.getElementById('titulo').value;
    let descricao = document.getElementById('descricao').value

    let objnoticia = {
        titulo: titulo,
        descricao: descricao
    }

    const options = {
        method: "POST",
        headers: new Headers({'Content-Type':'Application/json'}),
        body: JSON.stringify(objnoticia)
    }

    fetch('http://localhost:4000/news/noticias',options).then(res=>{
        Exibir();
        document.getElementById('titulo').value = '';
        document.getElementById('descricao').value = '';
    })

}

