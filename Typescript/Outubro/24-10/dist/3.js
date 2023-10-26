"use strict";
// const express = require('express');
// const app = express();
// app.get('/', (req:Request,res:Response)=>{
//     res.send
// })
// app.listen(3000, ()=>{
//     console.log('running on port 3000');
// })
// function concatArrays<U, T>(array1:U[], array2:T[]){
//     return [...array1, ...array2]
// }
// console.log(concatArrays([1,2,3], ['4','5','6']));
// function biggestValue<T extends string | number>(value1: T, value2: T):T{
//     let biggest:T = +value1 > +value2 ? value1 : value2
//     return biggest
// }
// console.log(biggestValue(1,2));
// console.log(biggestValue('3','5'));
// console.log(biggestValue('lodasjdiadjaoijdaiidasdasdasds','tesssssstee'));
// function reverseList<T>(list:T[]):T[]{
//     return list.reverse();
// }
// console.log(reverseList([1,2,3]));
// console.log(reverseList([1,3,true,'teste']));
// function sayValues<T>(a:T, b:T):void{
//     console.log(a, b);
// }
// sayValues('1','2')
// interface Car{
//     brand: string,
//     year: number,
//     onSale?: boolean
// }
// // function createCar<T extends Car>({brand, year, onSale}:T){
// //     const newCar = {brand, year, onSale}
// //     return newCar;
// // }
// function createCar({brand, year}:Car){
//     if(+year > 2012){
//         return {brand, year, onSale:true}
//     }
//     return {brand, year, onSale:false}
// }
// const Gol = createCar({brand: 'VW', year: 2012});
// const Corolla = createCar({brand: 'Toyota', year: 2018});
// const Cerato = createCar({brand: 'Kia', year: 2009});
// console.table([Gol, Corolla, Cerato])
