// const Sequelize = require('sequelize');
// const db = require('./index');

// const Produto = db.define('item', {
//     id: {
//         type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true
//     },
//     nome: {
//         type: Sequelize.STRING, allowNull:false
//     },
//     preco:{
//         type: Sequelize.DECIMAL
//     },
//     descricao:{
//         type: Sequelize.STRING(100)
//     },
// })

// module.exports = Produto;


const Sequelize = require('sequelize');
const db = require('./index');

const Produto = db.define('teste2', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING, 
        allowNull: false
    },
    descricao:{
        type: Sequelize.STRING(30), 
        allowNull: false
    }
})

module.exports = Produto;