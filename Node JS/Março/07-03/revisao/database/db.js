// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('teste', 'root', '!Zed6069', {
//     dialect: 'mysql',
//     host: 'localhost'
// })

// module.exports = sequelize;


const Sequelize = require('sequelize');
const sequelize = new Sequelize('teste','root','!Zed6069',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;