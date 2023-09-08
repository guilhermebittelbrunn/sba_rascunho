const { DataTypes, db } = require("../sequelize");
const Streaming = db.define("streaming", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    json: {
        allowNull: false,
        type: DataTypes.JSON,
    },
});

module.exports = Streaming;
