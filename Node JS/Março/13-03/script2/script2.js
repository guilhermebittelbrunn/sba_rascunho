// let teste = {
//     x: 'a',
//     y: 'b',
//     z: undefined
// }

// for(let i = 0; i < teste.length; i++){
//     console.log('test');
// }


function myFunction(a){
    return delete a.b;
    
}

console.log(myFunction({ a: 1, b: 7, c: 3 }));