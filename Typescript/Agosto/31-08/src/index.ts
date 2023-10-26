enum eturno{ //Define opções para turnos onde o usuário escolhe apenas entre as listadas, o que torna o código mais padronizado, ajuda na agilidade com o autocomplete e evita combinações erradas ou 
    matutino, // assaciações erradas.
    vespertino,
    noturno
}
interface Aluno{ //Define as variáveis que podem e devem ser listado dentro de um Aluno.
    nome: string,
    idade: number,
    turno: eturno, //Recebe o tipo ENUM, dessa maneira o usuário só poderá informar uma opção que esteja dentro do enum, seja mencionado com index (0 até 2) ou por nome (ex: eturno.matutino).
    lider?: boolean, //Propriedade opcional.
}
const Alunos:Aluno[] = [
    {
        nome: 'Guilherme',
        idade: 17,
        turno: eturno.vespertino //Define o turno pelas opções criadas dentro do Enum eturno
    },
    {
        nome: 'Jessica',
        idade: 14,
        turno: eturno.vespertino
    },
    {
        nome: 'Roseli',
        idade: 19,
        turno: eturno.matutino,
        lider: true //Define valor para um parâmetro que era opcional
    },
    {
        nome: 'Ivan',
        idade: 18,
        turno: eturno.noturno
    },
    {
        nome: 'Camilly',
        idade: 19,
        turno: eturno.matutino
    },
]

interface ACC_ELEMENT extends Aluno{ //Cria um interface que herdará os elementos da interface Aluno, com o propósito de complementar informações sem ter que mudar toda a estrutura do objeto raiz
    categoria?: string //cria uma nova propriedade que será em adição para as já criadas em aluno
}
interface ACC{
    [index:string] : ACC_ELEMENT[] //ACC será uma array de ACC_ELEMENT que receberá como indíce uma string, {key: [acc_element1, acc_element2, acc_element3]}
}

const alunosPorTurno:ACC = Alunos.reduce((acc: ACC, aluno:Aluno)=>{
    // const categoria = aluno.lider ? "Lider" : "Comum";
    const categoria = (eturno[aluno['turno']]); //cria uma variável com a descrição do turno dentro do enum, enviamos 1 e ele nos retorna vespertino
    if(acc[categoria] === undefined){ //verifica se o elemento existe dentro de acc sem usar falsy values
        acc[categoria] = [];
    }
    acc[categoria].push({...aluno, categoria}); //caso acc recebesse apenas as propriedades de aluno, ele não precisaria um elemento que faria extends, porém aqui queremos adicionar ainda mais uma propriedade
    return acc
},{})

for(let key in alunosPorTurno){
    console.log(`--- ${key} ---`);
    console.table(alunosPorTurno[key]);
}
