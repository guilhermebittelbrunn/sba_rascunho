const Animal = require('./Animal');
const Cachorro = require('./Cachorro');

const Douglas = new Animal('Douglas', 25);
const Frajola = new Cachorro('Frajola', 0, 'Border Collie');

console.log(Frajola.info(), Frajola.latir());
