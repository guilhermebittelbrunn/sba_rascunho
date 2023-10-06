// // const sayHello = (name, fn) => {
// //     console.log('Hello ' + name);
// //     fn();
// // };

// // const sayGoodBye = () => {
// //     console.log('goodbye');
// // };

// // sayHello['nome'] = 'Gustavo';
// // sayHello['funcao'] = sayGoodBye;

// // sayHello(sayHello.nome, sayHello.funcao);

// // console.log(sayHello);

// const list = [10, 20, 30];
// const fn = () => {
//     return 1;
// };

// fn['nome'] = 'testse';
// fn[3] = 'testse';
// console.log(typeof list);
// console.log(fn);

const list = [10, 20, 30, 40];

const list2 = [...list];

list2[4] = 50;

console.log('list', list);
console.log('list2', list2);
