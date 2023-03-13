const arr = [
    {
        tipo: 'a',
        qtd: 1,
    },
    {
        tipo: 'b',
        qtd: 2,
    },
    {
        tipo: 'a',
        qtd: 3,
    },
    {
        tipo: 'b',
        qtd: 5,
    },
    {
        tipo: 'c',
        qtd: 3       
    },
];

const obj = arr.reduce(
    (obj, item) => {
        // !obj[item.tipo] &&
        //     (obj[item.tipo] = {
        //         total: 0,
        //     });

        // if (!obj[item.tipo]) {
        //      obj[item.tipo] = {
        //          total: 0,
        //      };
        //  }

        obj[item.tipo] = obj[item.tipo] ?? {
            //?? Nullish coalescing operator (??)
            total: 0,
        };

        obj[item.tipo].total += item.qtd;

        return obj;
    },
    {
        // a: {
        //     total: 0,
        // },
        // b: {
        //     total: 0,
        // },
    }
);

console.table(obj);


