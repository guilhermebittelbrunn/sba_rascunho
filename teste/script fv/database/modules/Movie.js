const { DataTypes, db } = require("../sequelize");
const Genre = require("./Genre");
const Streaming = require("./Streaming");

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
        defaultValue: null,
    },
    duration: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
        defaultValue: "false",
    },
    backdrop_path: {
        type: DataTypes.STRING,
        defaultValue: "false",
    },
    adult: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    idAPI: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

Movie.belongsToMany(Streaming, {
    through: "streamingMovie",
    foreignKey: "idMovie",
    constraints: true,
});

Genre.belongsToMany(Movie, {
    through: "movieGenre",
    foreignKey: "idGenre",
    constraints: true,
});

Streaming.belongsToMany(Movie, {
    through: "streamingMovie",
    foreignKey: "idStreaming",
    constraints: true,
});

module.exports = Movie;
