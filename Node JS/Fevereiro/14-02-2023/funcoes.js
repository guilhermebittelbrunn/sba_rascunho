// module.exports = function Hello(){console.log("Hello");}


// let mult = function (valor1, valor2){
//     return valor1 * valor2;
// }

// module.exports = mult;

// let soma = function (valor1, valor2){
//     return valor1 + valor2;
// }

// module.exports = soma, mult;

let calc = {
    soma: function(a, b){
        return a + b;
    },
    mult: function(a, b){
        return a * b;
    }
}

module.exports.sub = function sub (a,b){
    return a - b;
}
module.exports.div = function div (a,b){
    return a / b;
}
module.exports.soma = function soma(a,b){
    return a + b;
}