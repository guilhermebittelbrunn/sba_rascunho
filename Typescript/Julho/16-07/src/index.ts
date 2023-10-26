enum Animals{
    dog = 1,
    cat = 2,
    rabbit = 3,
    bird = 4,
    turtle = 5
}

let AnimalHome:any[] = []

const Saimon:object = {
    id: 1,
    age: '10 years',
    specie: Animals.dog
}
const Yuri:object = {
    id: 2,
    age: '9 years',
    specie: Animals['1']
}
const Fred:object = {
    id:3,
    age: '12 years',
    specie: Animals.turtle 
}

AnimalHome.push(Saimon);
AnimalHome.push(Yuri);
AnimalHome.push(Fred);

console.log(AnimalHome)
console.log(AnimalHome.filter(item=>item.specie === 0))