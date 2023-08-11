const fs = require('fs');

const { Op } = require('sequelize');

const CustomError = require('../../utils/CustomError.cjs');

const { RC, PerfilVenda, Produto, Cliente } = require('../models/index.cjs');

const numeral = require('numeral');

// const { CloudantV1 } = require('@ibm-cloud/cloudant');
// const { IamAuthenticator } = require('ibm-cloud-sdk-core');

const axios = require('axios');

// const ibmkeys = {
//     apikey: 'maJUvtgy6oni7ppiMbYfh4tHIedjVDy8PEJKUH8BsoLD',
//     host: '600364d8-5b10-45e6-9eeb-21a6a5c5de42-bluemix.cloudantnosqldb.appdomain.cloud',
//     iam_apikey_description:
//         'Auto-generated for key crn:v1:bluemix:public:cloudantnosqldb:br-sao:a/6906359d838940e59ed7b3e79bc6e12d:c7d9a4d9-cbcc-43a3-ad99-5dd41098e0c9:resource-key:b10c9d15-1e9b-4e44-8546-baebaa488ab3',
//     iam_apikey_name: 'Credenciais de serviço-1',
//     iam_role_crn: 'crn:v1:bluemix:public:iam::::serviceRole:Manager',
//     iam_serviceid_crn:
//         'crn:v1:bluemix:public:iam-identity::a/6906359d838940e59ed7b3e79bc6e12d::serviceid:ServiceId-e8671c69-ed75-4466-b7ff-933f3121bfe8',
//     url: 'https://600364d8-5b10-45e6-9eeb-21a6a5c5de42-bluemix.cloudantnosqldb.appdomain.cloud',
//     username: '600364d8-5b10-45e6-9eeb-21a6a5c5de42-bluemix',
// };

// const authenticator = new IamAuthenticator({
//     apikey: ibmkeys.apikey,
// });

// const service = new CloudantV1({
//     authenticator: authenticator,
// });

// service.setServiceUrl(ibmkeys.url);

const Firebird = require('node-firebird');

const optionsFB = {};

optionsFB.host = 'excia-server'; //'firebird';
optionsFB.port = 3050;
optionsFB.database = 'sba'; //'C:\\EXCIA\\SBA.fdb'; // 'sba'; //'/var/lib/firebird/2.5/data/sba.fdb';
//optionsFB.database = 'sba_testes';
optionsFB.user = 'SYSDBA';
optionsFB.password = 'masterkey';
optionsFB.lowercase_keys = false; // set to true to lowercase keys
optionsFB.role = null; // default
optionsFB.pageSize = 4096;

const RCService = {
    getListRC: async (opt) => {
        let { page = 1, pageSize = 10, sort_by, order_by, filter = '', options = {} } = opt;
        //console.log(1, options);

        sort_by || (sort_by = 'createdAt');
        order_by || (order_by = 'desc');

        const regs = await RC.findAndCountAll({
            where: {
                [Op.or]: {
                    codigo: {
                        [Op.like]: `%${filter}%`,
                    },
                    nome: {
                        [Op.like]: `%${filter}%`,
                    },
                },
                ...(options.inativos !== '1' && {
                    ativo: true,
                }),
            },
            attributes: ['id', 'codigo', 'nome', 'createdAt', 'updatedAt', 'ativo'],
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [[sort_by, order_by]],
        });

        return regs;
    },
    getRCById: async (id) => {
        const reg = await RC.findByPk(id, {
            include: [
                {
                    model: PerfilVenda,
                    attributes: ['id', 'codigo', 'descricao'],
                    as: 'perfisVenda',
                    through: { attributes: [] },
                },
            ],
        });

        return reg;
    },
    getRCByCodigo: async (codigo) => {
        const reg = await RC.findOne({
            where: {
                codigo,
            },
        });

        return reg;
    },
    deleteRC: async (id) => {
        await RC.destroy({ where: { id: id } });

        return true;
    },
    getMaxRCByCodigo: async () => {
        return await RC.max('codigo');
    },
    createRC: async (data) => {
        const { codigo, auto, perfisVenda } = data;

        if (auto) {
            const max = (await RCService.getMaxRCByCodigo()) || 0;
            data.codigo = +max + 1;
        } else {
            const reg = await RCService.getRCByCodigo(codigo);
            if (reg) {
                throw new CustomError('RC já cadastrado com este código.', 409);
            }
        }

        data.codigo = numeral(data.codigo).format('0000');
        const newReg = await RC.create(data);
        await newReg.setPerfisVenda(perfisVenda);

        return newReg;
    },
    updateRC: async (id, data) => {
        const { codigo, perfisVenda } = data;

        if (codigo) {
            const reg = await RCService.getRCByCodigo(codigo);
            if (reg && reg.id !== id) {
                throw new CustomError('RC já cadastrado com este código.', 409);
            }
        }

        const reg = await RC.findByPk(id);
        //await RC.update(data, { where: { id } });
        await reg.update(data);
        await reg.setPerfisVenda(perfisVenda);

        return true;
    },
    syncRC: async (id) => {
        const reg = await RC.findByPk(id);

        const d = new Date();

        // for (const x in new Array(400).fill(1)) {
        //     console.log(x);

        //     const { data: nomes } = await axios.get('https://gerador-nomes.wolan.net/nomes/100');

        //     await Cliente.bulkCreate(
        //         nomes.map((item) => {
        //             return {
        //                 nome: item,
        //             };
        //         })
        //     );
        // }

        const arr = await service.postBulkDocs({
            db: 'teste',
            bulkDocs: {
                docs: await Cliente.findAll({
                    where: {
                        //ativo: true,
                    },
                    //limit: 0,
                    //skip: 20000,
                }).then((pros) => {
                    return pros.map(({ codigo, nome }) => {
                        return {
                            _id: 'tst_' + codigo,
                            tipo: 'tst',
                            codigo,
                            nome,
                            search: `${nome}-${codigo}`,
                            data: d.toISOString(),
                        };
                    });
                }),
            },
        });

        console.log(arr);

        return 1;

        await service
            .postBulkDocs({
                db: 'teste',
                bulkDocs: {
                    docs: await Produto.findAll({
                        where: {
                            ativo: true,
                        },
                        limit: 50,
                    }).then((pros) => {
                        return pros.map(({ codigo, descricao }) => {
                            return {
                                _id: 'pro_' + codigo,
                                tipo: 'pro',
                                codigo,
                                descricao,
                                search: `${descricao}-${codigo}`,
                                data: d.toISOString(),
                            };
                        });
                    }),
                },
            })
            .then(async (response) => {
                console.log(response.result);

                function sendImage(item) {
                    return new Promise((resolve) => {
                        const stream = fs.createReadStream('./image.png');

                        service
                            .putAttachment({
                                db: 'teste',
                                docId: item.id,
                                rev: item.rev, // we need the _rev of the doc we've just created
                                attachmentName: 'imagem',
                                attachment: stream,
                                contentType: 'image/png',
                            })
                            .then((r) => {
                                console.log(1, r);
                                setTimeout(() => {
                                    resolve();
                                }, 1000);
                            });
                    });
                }

                for (const item of response.result) {
                    await sendImage(item);
                }
            });

        // Firebird.attach(optionsFB, (err, db) => {
        //     db.query(
        //         `SELECT * FROM PRODUTO_001 WHERE COLECAO = '1100' --COLECAO > '1100' AND COLECAO <= '1106'`,
        //         [],
        //         (err, result) => {
        //             Produto.bulkCreate(
        //                 result.map((item) => {
        //                     return {
        //                         codigo: item.CODIGO,
        //                         descricao: item.DESCRICAO,
        //                     };
        //                 })
        //             ).then((x, y) => {
        //                 console.log(x);
        //             });

        //             db.detach();
        //         }
        //     );
        // });

        // service
        //     .postIndex({
        //         db: 'teste',
        //         //ddoc: 'json-index',
        //         //name: 'produto_descricao',
        //         index: {
        //             fields: ['tipo', 'search'],
        //         },
        //         //type: 'json'
        //     })
        //     .then((response) => {
        //         console.log(response.result);
        //     });

        // service
        //     .postIndex({
        //         db: 'teste',
        //         //ddoc: 'json-index',
        //         //name: 'produto_descricao',
        //         index: {
        //             fields: ['tipo', 'data', 'search'],
        //         },
        //         //type: 'json'
        //     })
        //     .then((response) => {
        //         console.log(response.result);
        //     });

        //return 1;

        //const { result } = await service.getAllDbs();
        //console.log(result);
        //return true;

        // service
        //     .putDatabase({
        //         db: 'teste',
        //         partitioned: false,
        //     })
        //     .then((response) => {
        //         console.log(response.result);
        //     });

        // service.postApiKeys().then((response) => {
        //     console.log(response.result);
        // });

        // service
        //     .putCloudantSecurityConfiguration({
        //         db: 'teste',
        //         //cloudant: { nobody: ['_reader'] },
        //         cloudant: { 'apikey-8a7aa992777b4429b1beeb2443a86de7': ['_reader', '_writer'] },
        //     })
        //     .then((response) => {
        //         console.log(response.result);
        //     });

        //await RC.update(data, { where: { id } });
        //await reg.update(data);
        //await reg.setPerfisVenda(perfisVenda);

        return 1;
    },
};

module.exports = RCService;
