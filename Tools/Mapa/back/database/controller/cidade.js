const { Cidade } = require('../module/index');
const { Op } = require('sequelize');
const path = require('path');
const Firebird = require('node-firebird');
const moment = require('moment');
const optionsFB = {};
const shapefile = require('shapefile');

optionsFB.host = 'excia-server'; //'firebird';
optionsFB.port = 3050;
// optionsFB.database = 'sba'; //'C:\\EXCIA\\SBA.fdb'; // 'sba'; //'/var/lib/firebird/2.5/data/sba.fdb';
optionsFB.database = 'sba_testes';
optionsFB.user = 'SYSDBA';
optionsFB.password = 'masterkey';
optionsFB.lowercase_keys = false; // set to true to lowercase keys
optionsFB.role = null; // default
optionsFB.pageSize = 4096; // default when creating database

const controller = {
    post: async (req, res) => {
        // console.log(1);
        // try {
        //     await shapefile
        //         .open('../../assets/shp/BR_Municipios_2022.shp', undefined, { encoding: 'utf-8' })
        //         .then((source) =>
        //             source.read().then(function log(result) {
        //                 if (result.done) return console.log(result.done);
        //                 console.log(result.value);
        //                 return source.read().then(log);
        //             })
        //         )
        //         .catch((error) => console.error(error.stack));
        //     const newCidade = await Cidade.create({
        //         CD_MUN: '1710904',
        //         NM_MUN: 'Itapiratins',
        //         SIGLA_UF: 'TO',
        //         AREA_KM2: 1246.349,
        //         GEO_JSON: { type: 'Polygon', coordinates: [[Array]] },
        //     });
        //     res.send(newCidade);
        // } catch (err) {
        //     return res.send(err).status(500);
        // }
        shapefile
            .open('C:/Users/ADMIN/Desktop/Sba Suporte/Relatórios/Mapa vendas/Municípios/Brasil', undefined, {
                encoding: 'utf-8',
            })
            .then((source) =>
                source.read().then(async function log(result) {
                    if (result.done) return;
                    const { properties } = result.value;
                    await Cidade.create({
                        ...properties,
                        GEO_JSON: result.value,
                    });
                    console.log(`${properties.NM_MUN} adicionado com sucesso, estado: ${properties.SIGLA_UF}`);
                    return source.read().then(log);
                })
            )
            .catch((error) => console.error(error.stack))
            .finally(() => {
                res.send(path_shp);
            });
    },

    getByRC: async (req, res) => {
        const attachFB = (opt) =>
            new Promise((resolve, reject) => {
                Firebird.attach(opt, (err, db) => {
                    if (err) throw err;

                    db.fixStrings = (obj) => {
                        for (const prop in obj) {
                            if (Buffer.isBuffer(obj[prop])) {
                                obj[prop] = obj[prop].toString('latin1');
                            }
                        }
                    };

                    db.on('commit', function () {
                        console.log('commit!');
                    });

                    db.queryFB = (
                        query,
                        params,
                        options = {
                            detachOnFinish: false,
                            //t: null,
                        }
                    ) =>
                        new Promise((resolve, reject) => {
                            //if (options.t === null) {
                            console.log(query);
                            db.query(query, params, (err, res) => {
                                //console.log(err);
                                options.detachOnFinish && db.detach();
                                if (err) return reject(err); //throw err;
                                resolve(res);
                            });
                            // } else {
                            //     options.t.query(query, params, (err, res) => {
                            //         //options.detachOnFinish && db.detach();
                            //         if (err) throw err;
                            //         resolve(res);
                            //     });
                            // }
                        });

                    db.transactionFB = () => {
                        return new Promise((resolve, reject) => {
                            db.transaction(Firebird.ISOLATION_READ_COMMITED, (err, transaction) => {
                                if (err) throw err;
                                transaction.queryFB = (query, params, options = {}) => {
                                    return new Promise((resolve, reject) => {
                                        //if (options.t === null) {
                                        console.log(query);
                                        transaction.query(query, params, (err, res) => {
                                            if (err) {
                                                transaction.rollback();
                                                reject(err);
                                            }
                                            resolve(res);
                                        });
                                        // } else {
                                        //     options.t.query(query, params, (err, res) => {
                                        //         //options.detachOnFinish && db.detach();
                                        //         if (err) throw err;
                                        //         resolve(res);
                                        //     });
                                        // }
                                    });
                                };
                                transaction.commitFB = () => {
                                    return new Promise((resolve, reject) => {
                                        //if (options.t === null) {
                                        transaction.commit((err) => {
                                            if (err) {
                                                transaction.rollback();
                                                reject(err);
                                            }
                                            resolve(true);
                                        });
                                    });
                                };
                                resolve(transaction);
                            });
                        });
                    };

                    // db.transaction(Firebird.ISOLATION_READ_COMMITED, function(err, transaction) {
                    //     transaction.query('INSERT INTO users VALUE(?,?)', [1, 'Janko'], function(err, result) {

                    //         if (err) {
                    //             transaction.rollback();
                    //             return;
                    //         }

                    //         transaction.commit(function(err) {
                    //             if (err)
                    //                 transaction.rollback();
                    //             else
                    //                 db.detach();
                    //         });
                    //     });
                    // });

                    resolve(db);
                });
            });
        (async () => {
            // const vencimento_init = '2023-05-10';
            // const vencimento_end = moment().format('yyyy-DD-MM');
            const cod_rep = req.params.id;
            const db = await attachFB(optionsFB);
            const rows = await db.queryFB(
                `
                SELECT
                    c2.COD_CID,
                    c2.COD_EST,
                    c2.NOME_CID,
                    MAX(p.DT_EMISSAO) AS ULTIMA_VENDA,
                    COUNT(DISTINCT p.NUMERO) AS QUANTIDADE_VENDAS,
                    (
                        SELECT COUNT(DISTINCT e2.CODCLI)
                        FROM PEDIDO_001 p2
                        LEFT JOIN ENTIDADE_001 e2 ON e2.CODCLI = p2.CODCLI
                        LEFT JOIN CADCEP_001 c3 ON c3.CEP = e2.CEP
                        WHERE c3.COD_CID = c2.COD_CID
                        AND p2.CODREP = ${cod_rep}
                        AND p2.DT_EMISSAO >= '2022-08-01'
                    ) AS QUANTIDADE_CLIENTES_CIDADE,
                    (
                        SELECT FIRST 1 e.CODCLI
                        FROM PEDIDO_001 p3
                        LEFT JOIN ENTIDADE_001 e ON e.CODCLI = p3.CODCLI
                        LEFT JOIN CADCEP_001 c4 ON c4.CEP = e.CEP
                        WHERE c4.COD_CID = c2.COD_CID
                        AND p3.CODREP = ${cod_rep}
                        AND p3.DT_EMISSAO = MAX(p.DT_EMISSAO)
                        ORDER BY p3.DT_EMISSAO
                    ) AS CODIGO_PRIMEIRO_CLIENTE,
                    (
                        SELECT FIRST 1 p3.NUMERO
                        FROM PEDIDO_001 p3
                        LEFT JOIN ENTIDADE_001 e ON e.CODCLI = p3.CODCLI
                        LEFT JOIN CADCEP_001 c4 ON c4.CEP = e.CEP
                        WHERE c4.COD_CID = c2.COD_CID
                        AND p3.CODREP = ${cod_rep}
                        AND p3.DT_EMISSAO = MAX(p.DT_EMISSAO)
                        ORDER BY p3.DT_EMISSAO
                    ) AS NUMERO_PRIMEIRO_PEDIDO,
                    (
                        SELECT FIRST 1 e.NOME
                        FROM PEDIDO_001 p4
                        LEFT JOIN ENTIDADE_001 e ON e.CODCLI = p4.CODCLI
                        LEFT JOIN CADCEP_001 c5 ON c5.CEP = e.CEP
                        WHERE c5.COD_CID = c2.COD_CID
                        AND p4.CODREP = ${cod_rep}
                        AND p4.DT_EMISSAO = MAX(p.DT_EMISSAO)
                        ORDER BY p4.DT_EMISSAO
                    ) AS NOME_PRIMEIRO_CLIENTE
                FROM PEDIDO_001 p
                LEFT JOIN ENTIDADE_001 e ON e.CODCLI = p.CODCLI
                LEFT JOIN CADCEP_001 c ON c.CEP = e.CEP
                LEFT JOIN CIDADE_001 c2 ON c2.COD_CID = c.COD_CID
                WHERE p.CODREP = ${cod_rep}
                AND p.DT_EMISSAO >= '2022-08-01'
                GROUP BY c2.COD_CID, c2.COD_EST, c2.NOME_CID
                ORDER BY c2.COD_CID;
                `
            );
            db.detach();

            const states = rows.reduce((acc, row) => {
                if (!acc[row.COD_EST]) {
                    acc[row.COD_EST] = [];
                }
                acc[row.COD_EST].push(row);
                return acc;
            }, []);
            const stateWithMoreCitys = [];
            for (let key in states) {
                //exibir demais estados apenas se existirem vendas em mais de duas cidades
                if (states[key].length > 1) stateWithMoreCitys.push(key);
            }

            const cidades = await Cidade.findAll({
                raw: true,
                attributes: ['GEO_JSON'],
                where: {
                    SIGLA_UF: {
                        [Op.in]: stateWithMoreCitys,
                    },
                },
            });
            console.log(cidades.length);
            res.send(rows);
        })();
    },
};

module.exports = controller;
