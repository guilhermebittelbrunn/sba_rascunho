const db = require('../database/db');
const Movie = require('./Movie');
const Genre = require('./Genre');
const User = require('./User');

(async () => {
    try {
        await db.sync();
        console.log('Database connect successfully');
    } catch (err) {
        console.log(`'err occored with database connection' ${err}`);
    }
})();

module.exports = {
    Movie,
    Genre,
    User,
};
