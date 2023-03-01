
document.addEventListener('DOMContentLoaded', () => {
    AtualizarAtividades();
})

function AtualizarAtividades(){

    fetch("http://localhost:4000/api/todos").then(res => {
        return res.json();

    }).then(json =>{
        let todoElements = '';
        let elements = JSON.parse(json);
        elements.forEach((atividade)=>{
            let todoElement = `
            <div class='Header' id="${atividade.id}" onclick="DeletarAtividade(this.id)">
                <h3 id="titulo">${atividade.titulo}</h3>
            </div>
            `
            todoElements += todoElement;
        })

        document.getElementById('todo-list').innerHTML = todoElements;
    })
}


function AdicionarAtividade(){

    let titulo = document.getElementById('titulo').value;
    let atividade = {titulo};

    const options = {
        method: "POST",
        headers: new Headers({'content-type':'application/json'}),
        body: JSON.stringify(atividade)
    }

    fetch("http://localhost:4000/api/novo", options).then(res=>{
        AtualizarAtividades();
        document.getElementById('titulo').value = '';
    })

}

function DeletarAtividade(element){

    let id = element;

    const options = {
        method: "DELETE",
        body: JSON.stringify(id)
    }

    fetch("http://localhost:4000/api/deletar", options).then(res=>{
        AtualizarAtividades();
    })
}