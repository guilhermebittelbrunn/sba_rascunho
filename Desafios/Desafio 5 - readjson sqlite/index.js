const sequelize = require('sequelize');
const fs = require('fs');
const db = require('./db');
const Client = require('./clients');
const colors = require('colors');

function readData(path) {
    const jsondata = fs.readFileSync(path, 'utf-8', (err, data) => {
        err && console.log('error'.red);
        return data;
    });

    return jsondata;
}

(async () => {
    try {
        //conecta o banco
        await db.sync();
        console.log('Banco conectado com sucesso'.green);

        //lê todos os jsons e insere na tabela
        const info = JSON.parse(readData('./teste.json'));
        // info.map(async (item, k) => {
        //     try {
        //         await Client.create(item);
        //         console.log(k);
        //     } catch (err) {
        //         console.log('err'.red);
        //     }
        // });
        console.log(colors.yellow(info[4]));
        await Client.create(info[4]);
    } catch (err) {
        console.log(err);
    }
})();
