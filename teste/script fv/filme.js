const sequelize = require("sequelize");
const db = require("./db_filmes");

const filme = db.define("filme", {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: sequelize.STRING,
        allowNull: false,
    },
    descricao: sequelize.STRING,
    lancamento: sequelize.DATE,
    // nota: sequelize.DOUBLE,
    titulo_orig: sequelize.STRING,
    nota: sequelize.DOUBLE,
    popularidade: sequelize.DOUBLE,
    imdb_id: sequelize.STRING,
    poster: sequelize.STRING,
    favorito: {
        type: sequelize.BOOLEAN,
        defaultValue: false,
    },
    assistido: {
        type: sequelize.BOOLEAN,
        defaultValue: false,
    },
    JSON: sequelize.JSON,
});

module.exports = filme;
