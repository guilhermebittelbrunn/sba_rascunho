const { Op } = require('sequelize');

const CustomError = require('../../utils/CustomError.cjs');

const { Colecao } = require('../models/index.cjs');

const numeral = require('numeral');

const ColecaoService = {
    getListColecao: async (opt) => {
        let { page = 1, pageSize = 10, sort_by, order_by, filter = '', options = {} } = opt;
        //console.log(1, options);

        sort_by || (sort_by = 'createdAt');
        order_by || (order_by = 'desc');

        const regs = await Colecao.findAndCountAll({
            where: {
                [Op.or]: {
                    codigo: {
                        [Op.like]: `%${filter}%`,
                    },
                    descricao: {
                        [Op.like]: `%${filter}%`,
                    },
                },
                ...(options.inativos !== '1' && {
                    ativo: true,
                }),
            },
            attributes: ['id', 'codigo', 'descricao', 'createdAt', 'updatedAt', 'ativo'],
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [[sort_by, order_by]],
        });

        return regs;
    },
    getColecaoById: async (id) => {
        const reg = await Colecao.findByPk(id);

        return reg;
    },
    getColecaoByCodigo: async (codigo) => {
        const reg = await Colecao.findOne({
            where: {
                codigo,
            },
        });

        return reg;
    },
    deleteColecao: async (id) => {
        await Colecao.destroy({ where: { id: id } });

        return true;
    },
    getMaxColecaoByCodigo: async () => {
        return await Colecao.max('codigo');
    },
    createColecao: async (data) => {
        const { codigo, auto } = data;

        if (auto) {
            const max = (await ColecaoService.getMaxColecaoByCodigo()) || 0;
            data.codigo = +max + 1;
        } else {
            const reg = await ColecaoService.getColecaoByCodigo(codigo);
            if (reg) {
                throw new CustomError('Coleção já cadastrada com este código.', 409);
            }
        }

        data.codigo = numeral(data.codigo).format('0000');
        const newReg = await Colecao.create(data);

        return newReg;
    },
    updateColecao: async (id, data) => {
        const { codigo } = data;

        if (codigo) {
            const reg = await ColecaoService.getColecaoByCodigo(codigo);
            if (reg && reg.id !== id) {
                throw new CustomError('Coleção já cadastrada com este código.', 409);
            }
        }

        await Colecao.update(data, { where: { id } });

        return true;
    },
};

module.exports = ColecaoService;
