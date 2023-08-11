const { Op } = require('sequelize');

const CustomError = require('../../utils/CustomError.cjs');

const { Usuario, RC } = require('../models/index.cjs');

const numeral = require('numeral');

const UsuarioService = {
    getListUsuario: async (opt) => {
        let { page = 1, pageSize = 10, sort_by, order_by, filter = '', options = {} } = opt;
        //console.log(1, options);

        sort_by || (sort_by = 'createdAt');
        order_by || (order_by = 'desc');

        const regs = await Usuario.findAndCountAll({
            where: {
                [Op.or]: {
                    username: {
                        [Op.like]: `%${filter}%`,
                    },
                    nome: {
                        [Op.like]: `%${filter}%`,
                    },
                },
                ...(options.inativos !== '1' && {
                    ativo: true,
                }),
            },
            attributes: ['id', 'username', 'nome', 'createdAt', 'updatedAt', 'ativo'],
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [[sort_by, order_by]],
        });

        return regs;
    },
    getUsuarioById: async (id) => {
        const reg = await Usuario.findByPk(id, {
            include: [
                {
                    model: RC,
                    attributes: ['id', 'codigo', 'nome'],
                },
            ],
        });

        return reg;
    },
    getUsuarioByUsername: async (username) => {
        const reg = await Usuario.findOne({
            where: {
                username,
            },
        });

        return reg;
    },
    deleteUsuario: async (id) => {
        await Usuario.destroy({ where: { id: id } });

        return true;
    },
    createUsuario: async (data) => {
        const { username } = data;

        const reg = await UsuarioService.getUsuarioByUsername(username);
        if (reg) {
            throw new CustomError('Usuario já cadastrado com este username.', 409);
        }

        const newReg = await Usuario.create(data);

        return newReg;
    },
    updateUsuario: async (id, data) => {
        const { username } = data;

        if (username) {
            const reg = await UsuarioService.getUsuarioByUsername(username);
            if (reg && reg.id !== id) {
                throw new CustomError('Usuario já cadastrado com este username.', 409);
            }
        }

        await Usuario.update(data, { where: { id } });

        return true;
    },
};

module.exports = UsuarioService;
