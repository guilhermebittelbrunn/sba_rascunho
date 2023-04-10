class Animal {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
    info() {
        return `Nome: ${this.nome}, Idade: ${this.idade}`;
    }
}

module.exports = Animal;
