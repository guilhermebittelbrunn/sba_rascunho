let calc = {
    soma: (valor1,valor2)=>{
        return valor1 + valor2;
    },
    sub: (valor1, valor2)=>{
        return valor1 - valor2;
    },
    mult: (valor1, valor2)=>{
        return valor1 * valor2;
    },
    div: (valor1, valor2)=>{
        return valor1 / valor2
    }
}

module.extends = calc;

calc.mult(3,5);