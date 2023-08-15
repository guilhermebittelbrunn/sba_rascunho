const { db } = require("../sequelize");
const Movie = require("./Movie");
const Genre = require("./Genre");
const Streaming = require("./Streaming")(async () => {
    try {
        await db.sync();
        console.log("database connection successfuly");
    } catch (err) {
        throw err;
    }
})();

module.exports = { Movie, Genre, Streaming };
