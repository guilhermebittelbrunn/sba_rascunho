const sequelize = require('sequelize');
const db = require('../db/database');

const Employee = db.define('Employee', {
    id: {
        type: sequelize.INTEGER,
        allownull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize.STRING,
        allownull: false,
    },
    age: {
        type: sequelize.NUMBER,
        allownull: false,
    },
    salary: {
        type: sequelize.DOUBLE,
        defaultValue: 1000.0,
    },
});

module.exports = Employee;
