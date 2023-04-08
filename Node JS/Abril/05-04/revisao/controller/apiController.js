const Aluno = require('../modules/Aluno');

module.exports = {
    showAll: async (req, res) => {
        const turma = await Aluno.findAll({});
        res.send(turma);
    },
    create: async (req, res) => {
        const new_student = {
            nome: 'Felipe',
            idade: 17,
        };
        try {
            await Aluno.create(new_student);
            res.send('Aluno criado com sucesso!');
        } catch (err) {
            res.status(500).send(err);
        }
    },
    read: async (req, res) => {
        try {
            const student = await Aluno.findOne({
                where: (id = 2),
            });
            (await student) == undefined ? res.status(400).send('error, student undefined') : res.send(student);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        Aluno.update(
            {
                turma: '3C',
            },
            {
                where: {
                    id,
                },
            }
        );
        res.redirect('http://localhost:4000/alunos/');
    },
    delete: async (req, res) => {
        try {
            const student = await Aluno.findOne({
                where: {
                    id: 3,
                },
            });
            (await student) == undefined ? res.status(400).send('error, student undefined') : student.destroy();
            res.send(student);
        } catch (err) {
            return res.status(500).send(err);
        }
    },
    index: (req, res) => {
        res.redirect('http://localhost:4000/');
    },
};
