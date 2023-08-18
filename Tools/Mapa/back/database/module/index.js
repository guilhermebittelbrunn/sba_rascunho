const Cidade = require('./Cidade');
const { db } = require('../sequelize');

(async () => {
    try {
        await db.sync();
        console.log('Database connected successfuly');
    } catch (err) {
        console.log(`Database error: ${err}`);
    }
})();

module.exports = { Cidade };
