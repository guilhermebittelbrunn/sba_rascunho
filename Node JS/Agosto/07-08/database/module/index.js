const db = require('../sequelize');
const Car = require('./Car');
const User = require('./User');

(async () => {
    try {
        await db.sync({ force: false });
        console.log('Database connection successful');
    } catch (err) {
        console.log(`Database err occorred ${err}`);
    }
})();

module.exports = { Car, User };
