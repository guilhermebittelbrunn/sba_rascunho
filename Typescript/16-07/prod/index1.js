"use strict";
var AnimalType;
(function (AnimalType) {
    AnimalType[AnimalType["Rabbit"] = 0] = "Rabbit";
    AnimalType[AnimalType["Cat"] = 1] = "Cat";
    AnimalType[AnimalType["Dog"] = 2] = "Dog";
    AnimalType[AnimalType["Bird"] = 3] = "Bird";
})(AnimalType || (AnimalType = {}));
const Animais = {};
function createAnimal(name, id, age, specie) {
    Animais[name] = { id, age, specie };
}
createAnimal('Abel', 1, '6 months', AnimalType.Rabbit);
createAnimal('Saimon', 4, '10 years', AnimalType.Dog);
createAnimal('Yuri', 5, '7 years', AnimalType.Dog);
function createAnimalFilter(listAnimals, specie) {
    let listSpecie = [];
    for (let key in listAnimals) {
        if (typeof listAnimals[key].specie === 'number')
            if (listAnimals[key].specie === specie) {
                listSpecie.push(listAnimals[key]);
            }
    }
    return listSpecie;
}
console.log('Lista de animais:', Animais);
console.log(`Lista de ${AnimalType['0']} ${JSON.stringify(createAnimalFilter(Animais, AnimalType.Rabbit))}`);
