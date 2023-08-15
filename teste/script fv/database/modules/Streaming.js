const { DataTypes, db } = require("../sequelize");
const Streaming = db.define("straming", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    icon_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Streaming;
