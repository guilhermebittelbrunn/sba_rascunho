const Sequelize = require('sequelize');
const db = new Sequelize('mercado','root','!Zed6069',{
    dialect: 'mysql',
    host:'localhost'
})

module.exports = db;