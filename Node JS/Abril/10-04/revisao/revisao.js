class Aluno {
    constructor(matricula, turma, nome, idade) {
        this.matricula = matricula;
        this.turma = turma;
        this.nome = nome;
        this.idade = idade;
    }

    saudacao() {
        return `meu nome é ${this.nome} e sou da turma ${this.turma}`;
    }

    info() {
        return `
        matrícula: ${this.matricula}
        turma: ${this.turma}
        nome: ${this.nome}
        idade: ${this.idade}
        `;
    }
}

const Douglas = new Aluno(12345, '2A', 'Douglas', 21);

console.log(Douglas);
