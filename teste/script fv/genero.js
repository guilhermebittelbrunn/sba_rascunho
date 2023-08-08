const sequelize = require("sequelize");
const db = require("./db_filmes");
const genero = db.define("genero", {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    nome: {
        type: sequelize.STRING,
        allowNull: false,
    },
});

module.exports = genero;
