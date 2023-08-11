const CustomError = require('../../utils/CustomError.cjs');

const { UsuarioService } = require('../services/index.cjs');

const jwt = require('jsonwebtoken');

const UsuarioController = {
    listUsuario: async (req, res) => {
        const { page, pageSize, sort_by, order_by, filter, options } = req.query;

        const regs = await UsuarioService.getListUsuario({
            page,
            pageSize,
            sort_by,
            order_by,
            filter,
            options,
        });

        res.send(regs);
    },
    getUsuario: async (req, res) => {
        const { id } = req.params;

        const reg = await UsuarioService.getUsuarioById(id);

        res.send(reg);
    },
    deleteUsuario: async (req, res) => {
        const { id } = req.params;

        await UsuarioService.deleteUsuario(id);

        res.send({ ok: true });
    },
    postUsuario: async (req, res) => {
        const { username, password, nome, admin, ativo, rcId } = req.body;

        const newReg = await UsuarioService.createUsuario({
            username,
            password,
            nome,
            admin,
            ativo,
            rcId,
        });

        res.send(newReg);
    },
    putUsuario: async (req, res) => {
        const { id } = req.params;
        const { username, password, nome, admin, ativo, rcId } = req.body;

        await UsuarioService.updateUsuario(id, {
            username,
            password,
            nome,
            admin,
            ativo,
            rcId,
        });

        res.send({ ok: true });
    },
    loginUsuario: async (req, res) => {
        const { username, password } = req.body;

        const user = await UsuarioService.getUsuarioByUsername(username);

        if (!user) {
            throw new CustomError('Usuário não encontrado');
        }

        if (user.password !== password) {
            throw new CustomError('Senha incorreta');
        }

        const token = jwt.sign({ id: user.id }, '123456');

        res.send({
            token,
            user: {
                id: user.id,
                nome: user.nome,
            },
        });
    },
};

module.exports = UsuarioController;
