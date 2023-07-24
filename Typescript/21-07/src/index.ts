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

// // interface alumnSetup{
// //     nome: string,
// //     idade: number,
// //     turno: string,
// //     aprovado: boolean
// // }


// // const Alumns:alumnSetup[] = [
// //     {
// //         nome: 'Guilherme',
// //         idade: 15,
// //         turno: 'matutino',
// //         aprovado: true
// //     },
// //     {
// //         nome: 'Jessica',
// //         idade: 21,
// //         turno: 'matutino',
// //         aprovado: false
// //     },
// //     {
// //         nome: 'Roseli',
// //         idade: 13,
// //         turno: 'noturno',
// //         aprovado: false
// //     },
// //     {
// //         nome: 'Camilly',
// //         idade: 15,
// //         turno: 'vespertino',
// //         aprovado: true
// //     },
// //     {
// //         nome: 'Ivan',
// //         idade: 23,
// //         turno: 'noturno',
// //         aprovado: true
// //     },
// // ]


// // function filterAlumns(list: alumnSetup[], filterValue:string){
// //     const listFilter:object[] = list.reduce((acc:any, item:any)=>{
// //         if(!acc[item[filterValue]]){
// //             acc[item[filterValue]] = [];
// //         }
// //         acc[item[filterValue]].push(item)
// //         return acc
// //     },[])

// //     return listFilter
// // }
// // const list = filterAlumns(Alumns, 'aprovado')

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
throw ('err');