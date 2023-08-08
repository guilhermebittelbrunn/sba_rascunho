const sequelize = require('sequelize');
const db = require('./db_filmes');

const genero = require('./genero');
const filme = require('./filme');

const genero_filme = db.define('genero_filme', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
});

genero_filme.belongsToMany(genero, { through: genero_filme });
genero_filme.belongsToMany(filme, { through: genero_filme });

module.exports = genero_filme;
