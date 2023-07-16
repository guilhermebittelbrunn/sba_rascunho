enum AnimalType{Rabbit, Cat, Dog, Bird}
const Animais:any = {}

function createAnimal(name:string, id:number, age:string, specie:number){
    Animais[name] = {id, age, specie};
}

createAnimal('Abel', 1, '6 months', AnimalType.Rabbit);
createAnimal('Saimon', 4, '10 years', AnimalType.Dog);
createAnimal('Yuri', 5, '7 years', AnimalType.Dog);

function createAnimalFilter(listAnimals:any, specie:number):any{
    let listSpecie:object[] = [];
    for(let key in listAnimals){
  
   if(typeof listAnimals[key].specie === 'number')
     if(listAnimals[key].specie === specie){
        listSpecie.push(listAnimals[key])
     }
    }
    return listSpecie
} 

console.log('Lista de animais:', Animais)
console.log(`Lista de ${AnimalType['0']} ${JSON.stringify(createAnimalFilter(Animais, AnimalType.Rabbit))}`);
