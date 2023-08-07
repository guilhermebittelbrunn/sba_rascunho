const sequelize = require('sequelize');
const db = require('../sequelize');
const Car = require('./Car');

const User = db.define('user', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        alloNull: false,
    },
    code: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
    },
    email: sequelize.STRING,
});

Car.belongsTo(User, {
    foreignKey: {
        name: 'idUser',
        allowNull: false,
    },
});

module.exports = User;
