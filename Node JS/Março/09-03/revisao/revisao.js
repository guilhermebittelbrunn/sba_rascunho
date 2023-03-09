// const arr = [
//     {
//         tipo: 'a',
//         qtd: 1,
//     },
//     {
//         tipo: 'b',
//         qtd: 2,
//     },
//     {
//         tipo: 'a',
//         qtd: 3,
//     },
//     {
//         tipo: 'b',
//         qtd: 5,
//     },
//     {
//         tipo: 'c',
//         qtd: 3,
//     },
// ];

// const obj = arr.reduce(
//     (obj, item) => {
//         // !obj[item.tipo] &&
//         //     (obj[item.tipo] = {
//         //         total: 0,
//         //     });

//         // if (!obj[item.tipo]) {
//         //      obj[item.tipo] = {
//         //          total: 0,
//         //      };
//         //  }

//         obj[item.tipo] = obj[item.tipo] ?? {
//             //?? Nullish coalescing operator (??)
//             total: 0,
//         };

//         obj[item.tipo].total += item.qtd;

//         return obj;
//     },
//     {
//         // a: {
//         //     total: 0,
//         // },
//         // b: {
//         //     total: 0,
//         // },
//     }
// );

// console.log(obj);



// let falsy_0 = null;
// let falsy_1 = undefined;
// let falsy_2 = '';
// let falsy_3 = 0;
// let falsy_4 = [].length;
// let falsy_5 = NaN;
// let falsy_6 = false;
// let falsy_7 = -0;
// let falsy_8 = 10 > 20;

// const array_falsy = [falsy_0, falsy_1, falsy_2, falsy_3, falsy_4, 
//                     falsy_5, falsy_6, falsy_7, falsy_8];
// const array = []

// array_falsy.forEach(item=>{
//     array.push(item ?? 'Null or undefined');
// })

// console.log(array.map((item, qtd)=>{
//     return  `falsy_${qtd} = ${item}  `
// }))


// if (falsy_3){
//     console.log(falsy_3)
// }

// if (falsy_2){
//     console.log(falsy_2);
// }

// if(!falsy_3){
//     console.log(falsy_3);
// }

let a; 
console.log(a ?? 'verdadeiro');