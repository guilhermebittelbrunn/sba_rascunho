// // // let count: number = 0

// // // interface setupCar{
// // //     id: number,
// // //     brand:string,
// // //     model?:string,
// // //     year:number
// // // }

// // // function createCar(brand:string, year:number, model:string='',){
// // //     count++
// // //     return {id: count, brand, year, model}
// // // }

// // // const carG:setupCar = createCar('Kia', 2012);
// // // const carI:setupCar = createCar('Volkswagen', 2018, 'Jetta');
// // // console.log(carG)
// // // console.log(carI)

// interface alumnSetup{
//     nome: string,
//     idade: number,
//     turno: string,
//     aprovado: boolean
// }


// const Alumns:alumnSetup[] = [
//     {
//         nome: 'Guilherme',
//         idade: 15,
//         turno: 'matutino',
//         aprovado: true
//     },
//     {
//         nome: 'Jessica',
//         idade: 21,
//         turno: 'matutino',
//         aprovado: false
//     },
//     {
//         nome: 'Roseli',
//         idade: 13,
//         turno: 'noturno',
//         aprovado: false
//     },
//     {
//         nome: 'Camilly',
//         idade: 15,
//         turno: 'vespertino',
//         aprovado: true
//     },
//     {
//         nome: 'Ivan',
//         idade: 23,
//         turno: 'noturno',
//         aprovado: true
//     },
// ]

// interface accSetup{
//     [index: string]: alumnSetup[]
// }

// function filterAlumns(list: alumnSetup[], filterValue:string){
//     const listFilter:accSetup[] = list.reduce((acc:accSetup, item:alumnSetup)=>{
//         if(`${[item[filterValue]]}` in acc){
//             acc[item[filterValue]] = [];
//         }
//         acc[item[filterValue]].push(item)
//         return acc
//     },[])

//     return listFilter
// }
// const list = filterAlumns(Alumns, 'aprovado')

// // console.log(list[0])

// // // console.log('nomee' in Alumns[0])


// // const list:any = [];
// // list['teste'] = [];
// // list.push('123');
// // list.push('456');

// // console.log(list)
// // console.log(list[2])

// enum AnimalType{
//     dog, cat, bird, rabbit, turtle
// }

// interface Animal{
//     id:number,
//     age:string,
//     specie:string | number
//     [index:string]:string | number
// }

// const listAnimal: Animal[] = [
//     {
//         id: 1,
//         age: '7 months',
//         // name: 'Abel',
//         specie: AnimalType.rabbit
//     },
//     {
//         id: 2,
//         age: '3 months',
//         // name: 'Snopy',
//         specie: AnimalType.rabbit
//     },
//     {
//         id: 3,
//         age: '10 years',
//         // name: 'Saimon',
//         specie: AnimalType.dog
//     },
//     {
//         id: 4,
//         age: '12 years',
//         // name: 'Fred',
//         specie: AnimalType.turtle
//     },
//     {
//         id: 5,
//         age: '7 years',
//         // name: 'Yuri',
//         specie: AnimalType.dog
//     },
// ]


// const newAnimal:Animal = {id:11, age: '1 year', specie: AnimalType.cat, color: 'Brown'};

// console.log(newAnimal)


// const arrayalt:[number, string?, number?] = [10,,30];
// console.log(arrayalt)
// console.log(arrayalt.length)

// const double = (val1:number, val2?:number) : number=>{
//     if(val2 === undefined){
//         return val1 * 2
//     }
//     return (val1 + val2) * 2
// }
// console.log(double(10, 5))


// const array_arrays1:number[][] = [[10,20,30]]
// const array_arrays2:Array<number[]> = [[10,20,30]],

// console.log('err')
// throw ('err');


// interface CarSetup{
//     model: string,
//     year: number
// }

// interface Car{
//     [index: string]: CarSetup
// }

// const craeteCar = (dono: string, model: string, year:number):Car =>{
//     return {
//         [dono]: {
//             model,
//             year
//         }
//     }
// }

// const CarG = craeteCar('Guilherme', 'Cerato', 2012)
// const CarI = craeteCar('Ivan', 'Jetta', 2018)


// console.log(CarG)
// console.log(CarI)

interface Review{
    name: string,
    stars?: string | number | boolean
}

const reviewR:Review = {
    name: 'Rodrigo',
    stars: 3
}
const reviewD:Review = {
    name: 'Douglas',
    stars: false
}
const reviewM:Review = {
    name: 'Marcos',
    stars: 3
}
const reviewC:Review = {
    name: 'Cláudio',
}

const reviews:Review[] = [reviewR,reviewD]


function replyReview(review:Review){
    
        switch (review.stars){
            case 1:
                return `${review.name} deu 1 estrela`;  
            case 2:
                return `${review.name} deu 2 estrela`;  
            case 3:
                return `${review.name} deu 3 estrela`;    
            case 4:
                return `${review.name} deu 4 estrela`;
            case 5:
                return `${review.name} deu 5 estrela`;    
        }
      
  
}

reviews.forEach(review=>{
    if("stars" in review){
        if(typeof review.stars === 'number' || typeof review.stars === 'string'){
            return console.log(replyReview(review))
        }
        else if(typeof review.stars === 'boolean'){
            return console.log(`${review.name} não avaliou a aula`)
        }
    }
})
