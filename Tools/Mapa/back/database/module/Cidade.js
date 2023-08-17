const { db, DataTypes } = require('../sequelize');
const Cidade = db.define('cidades', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    CD_MUN: {
        type: DataTypes.CHAR(8),
        allowNull: false,
    },
    NM_MUN: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    SIGLA_UF: {
        type: DataTypes.CHAR(2),
        allowNull: false,
    },
    AREA_KM2: DataTypes.DOUBLE,
    GEO_JSON: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

module.exports = Cidade;
