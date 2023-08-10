const { db, DataTypes } = require("../sequelize");
const Genre = db.define("genre", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
});

module.exports = Genre;
