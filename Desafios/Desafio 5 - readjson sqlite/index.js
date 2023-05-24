const fs = require('fs');
const db = require('./db');
const Client = require('./clients');
const colors = require('colors');
const erros = [];
const action = process.argv[2];

const readData = (path) => {
    const jsondata = fs.readFileSync(path, 'utf-8', (err, data) => {
        err && console.log('error'.red);
        return data;
    });
    return jsondata;
};

const isJSON = (string) => {
    try {
        JSON.parse(string);
    } catch (err) {
        return false;
    }
    return true;
};

(async () => {
    try {
        //conecta o banco
        await db.sync();
        console.log('Banco conectado com sucesso'.green);

        switch (action) {
            case 'c':
                //lê todos os jsons e insere na tabela
                const info = JSON.parse(readData('./teste.json'));
                info.map(async (item, k) => {
                    let user = {
                        cnpj: item.estabelecimento.cnpj,
                        situacao: item.estabelecimento.situacao_cadastral,
                        json: item,
                    };
                    try {
                        for (let key in item) {
                            user = { ...user, [key]: JSON.stringify(item[key]) };
                        }
                        try {
                            await Client.create(user);
                            console.log(colors.green(k));
                        } catch (err) {
                            console.log(colors.red(k));
                            erros.push(k);
                        } finally {
                            console.log(erros);
                        }
                    } catch (err) {
                        console.log('err'.red);
                    }
                });
                break;
            case 'r': {
                //busca um cnpj
                (async () => {
                    const cnpjs = process.argv[3]
                        ? await Client.findOne({ where: { cnpj: process.argv[3] } })
                        : await Client.findAll({});
                    if (process.argv[3]) {
                        let user = {};
                        for (let key in cnpjs.dataValues) {
                            // console.log(cnpjs.dataValues[key], isJSON(cnpjs.dataValues[key]));
                            user = {
                                ...user,
                                [key]: isJSON(cnpjs.dataValues[key])
                                    ? JSON.parse(cnpjs.dataValues[key])
                                    : cnpjs.dataValues[key],
                            };
                        }
                        console.log(user);
                    } else {
                        let lista = cnpjs.reduce((acc, item) => {
                            if (!acc[item.situacao]) {
                                acc[item.situacao] = [];
                            }
                            acc[item.situacao].push(item);
                            return acc;
                        }, {});

                        for (let key in lista) {
                            console.log(`${key}: ${lista[key].length}`);
                        }
                    }
                })();
            }
        }
        action === 'c' && console.log(erros);
    } catch (err) {
        console.log(err);
    }
})();
