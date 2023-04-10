const Animal = require('./Animal');

class Cachorro extends Animal {
    constructor(nome, idade, raca) {
        super(nome, idade);
        this.raca = raca;
    }
    latir() {
        return 'AuAuAu';
    }
}

module.exports = Cachorro;
