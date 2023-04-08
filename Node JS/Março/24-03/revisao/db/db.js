const Sequelize = require('sequelize');
const db = new Sequelize({
    database: 'banco_teste',
    dialect: 'sqlite',
    storage: './db/test_sqlite.sqlite',
});

module.exports = db;
