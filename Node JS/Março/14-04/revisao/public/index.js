function mostrarAlunos(){
    fetch('http://localhost:4000/todos').then(res=>{
        return res.json();
    }).then(data=>{
        criarElementos(data);
    })
}

function deletarAluno(aluno){
    const id = aluno.parentElement.parentElement.id;
    const option = {method: 'delete'};

    fetch('http://localhost:4000/' + id, option).then(res=>{
        filtrarAlunos();
    })
}

function criarElementos(data){
    const mural_alunos = document.getElementById('mural_alunos');
    let ul = '<ul>'
    data.forEach(aluno =>{
        let observacao = aluno.observacao ?? '';
        ul += `
            <div class="card" id="${aluno.id}">
                <div class="card_header">
                    <h3>${aluno.nome}</h3>
                    <button onclick="deletarAluno(this)">X</button>
                    <h3>${aluno.idade}</h3>
                </div>
                <div class="card_body">
                    <div class="article">
                        <h4>${aluno.periodo}</h4>
                        <p>${observacao}</p>
                    </div>
                    <div class="footer">${aluno.situacao}</div>
                </div>
            </div>
        `
    })
    mural_alunos.innerHTML = ul + '</ul>';
}

function filtrarAlunos(){

    const filtros_periodo =  document.getElementById('filtro_periodo').value;

    fetch('http://localhost:4000/' + filtros_periodo).then(res=>{
        return res.json();
    }).then(data=>{
        criarElementos(data);
    })
}