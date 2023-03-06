// let lista = [
//     10, 20, 30, 40, 50
// ];


// lista_filter = lista.filter(item=>{
//     return item > 20;
// });

// lista_reduce = lista.reduce((total, item)=>{
//     total += item;
//     return total;
// },0)

// lista_map = lista.map(item=>{
//     return `Valor: ${item}`;
// })


// console.log(lista);
// console.log(lista_filter);
// console.log(lista_reduce);
// console.log(lista_map);

// fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL").then(res=>{
//     return res.json();
// }).then(data=>{
//     let dolar = data.USDBRL.low;
//     dolar = dolar.toFixed(2);
//     console.log(dolar);
// })

// const key = '0b0b9c5caf2a2a7fdea9672747e95678';
// const api = ` https://pokeapi.co/api/v2/pokemon/ditto`;
// fetch(api).then(res=>{
//     return res.json();
// }).then(data=>{
//     let pokeinfo = data.forms[0].url;
//     fetch(pokeinfo).then(baseinfo=>{
//         return baseinfo.json();
//     }).then(json=>{
//         console.log(json.sprites.front_default);
//     })
// })