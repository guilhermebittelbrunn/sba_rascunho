const { DataTypes, db } = require("../sequelize");
const Genre = require("./Genre");
const Movie = db.define("movie", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    sinopse: {
        type: DataTypes.TEXT,
        defaultValue: "Sem sinopse",
    },
    original_title: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    vote: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
    },
    count_votes: {
        type: DataTypes.INTEGER,
    },
    release: {
        type: DataTypes.STRING(10),
    },
    score_popularity: {
        type: DataTypes.DOUBLE,
    },
    poster_path: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    backdrop_path: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    adult: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    json: {
        type: DataTypes.JSON,
    },
});

Movie.belongsToMany(Genre, {
    through: "movieGenre",
    foreignKey: "idMovie",
    constraints: true,
});
Genre.belongsToMany(Movie, {
    through: "movieGenre",
    foreignKey: "idGenre",
    constraints: true,
});

module.exports = Movie;
