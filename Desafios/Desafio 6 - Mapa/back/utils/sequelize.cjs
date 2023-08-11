const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    database: 'fv_test',
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: (text) => {
        //console.log(text.red);
    },
});

module.exports = sequelize;
