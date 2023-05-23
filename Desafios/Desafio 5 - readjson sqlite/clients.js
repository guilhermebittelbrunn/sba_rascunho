const sequelize = require('sequelize');
const db = require('./db');

const Client = db.define('clients', {
    cnpj_raiz: {
        type: sequelize.STRING,
        primaryKey: true,
        allowNull: true,
    },
    razao_social: {
        type: sequelize.STRING,
    },
    capital_social: {
        type: sequelize.STRING,
    },
    responsavel_federativo: {
        type: sequelize.STRING,
    },
    atualizado_em: {
        type: sequelize.STRING,
    },
    porte: {
        type: sequelize.ABSTRACT,
    },
    natureza_jurifica: {
        type: sequelize.STRING,
    },
    qualificacao_do_responasavel: {
        type: sequelize.STRING,
    },
    socios: {
        type: sequelize.ABSTRACT,
    },
    simples: {
        type: sequelize.STRING,
    },
    // atividade_secundarias: {
    //     type: sequelize.ARRAY
    // },
    // cnpj_raiz: {
    //     type: sequelize.STRING
    // },
    // cnpj_ordem: {
    //     type: sequelize.STRING
    // },
    // cnpj_digito_verificador: {
    //     type: sequelize.STRING
    // },
    // tipo: {
    //     type: sequelize.STRING
    // },
    // nome_fantasia: {
    //     type: sequelize.STRING
    // },
    // sintuacao_cadastral: {
    //     type: sequelize.STRING
    // },
    // data_situacao_cadastral: {
    //     type: sequelize.STRING
    // },
    // data_inicio_atividade: {
    //     type: sequelize.STRING
    // },
    // nome_cidade_exetior: {
    //     type: sequelize.STRING
    // },
    // tipo_logradouro: {
    //     type: sequelize.STRING
    // },
    // numero: {
    //     type: sequelize.STRING
    // },
    // complento: {
    //     type: sequelize.STRING
    // },
    // bairro: {
    //     type: sequelize.STRING
    // },
    // cep: {
    //     type: sequelize.STRING
    // },
    // ddd1: {
    //     type: sequelize.STRING
    // },
});

module.exports = Client;
