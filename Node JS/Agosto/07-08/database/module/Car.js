const { DataTypes } = require('sequelize');
const db = require('../sequelize');

const Car = db.define('car', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: DataTypes.INTEGER,
});

module.exports = Car;
