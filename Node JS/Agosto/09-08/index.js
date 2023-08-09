const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    define: {
        freezeTableName: true,
        logging: false,
    },
});

const Filme = db.define('filme', {
    titulo: DataTypes.STRING,
});
const Genero = db.define('genero', {
    nome: DataTypes.STRING,
});

Filme.belongsToMany(Genero, {
    through: 'filmeGenero',
    foreignKey: 'filmeId',
    constraints: true,
});

Genero.belongsToMany(Filme, {
    through: 'filmeGenero',
    foreignKey: 'generoId',
    constraints: true,
});

db.sync()
    .then(async (res) => {
        console.log('Database connected successfully');
        // const newGeneros = await Genero.bulkCreate([
        //     {
        //         nome: 'ação',
        //     },
        //     {
        //         nome: 'aventura',
        //     },
        //     {
        //         nome: 'ficção',
        //     },
        // ]);
        // const newFilme = await Filme.create({ titulo: 'Dr. Dolittle' });
        // const filmGenres = [2, 3];
        // genres.forEach((genre) => {
        //     newFilme.setGeneros([genre]);
        // });
        // newFilme.setGeneros([newGeneros]);

        const info = await Filme.findAll({
            // raw: true,
            include: [
                {
                    model: Genero,
                    required: false,
                    attributes: ['nome'],
                    through: { attributes: [] },
                },
            ],
        });
        // console.table(info);
        console.log(info[0].dataValues);
    })
    .catch((err) => {
        console.log(`error occurred db sync: ${err}`);
    });
