import {Aluno, Alunos, periodo} from './Aluno'

function filtrarAlunos<T extends keyof Aluno>(listaAlunos:Aluno[], filtro:T){
    return listaAlunos.reduce((acc: {[index:string]: Aluno[]}, aluno: Aluno)=>{
        if(filtro in aluno){
            if(acc[aluno[filtro]] === undefined){
                acc[aluno[filtro]] = [];
            }
            acc[aluno[filtro]].push(aluno);
        }
        return acc
    }, {})
}

const alunosPeriodo = filtrarAlunos(Alunos, 'periodo');

for(let key in alunosPeriodo){
    console.log(`--- ${periodo[+key]} ---`);
    console.table(alunosPeriodo[key]);
}

