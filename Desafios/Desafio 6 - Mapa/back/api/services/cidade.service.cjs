const { Op } = require('sequelize');

const CustomError = require('../../utils/CustomError.cjs');

const { Cidade } = require('../models/index.cjs');

const numeral = require('numeral');

const CidadeService = {
    getListCidade: async (opt) => {
        let { page = 1, pageSize = 10, sort_by, order_by, filter = '', options = {} } = opt;
        //console.log(1, options);

        sort_by || (sort_by = 'createdAt');
        order_by || (order_by = 'desc');

        const regs = await Cidade.findAndCountAll({
            where: {
                [Op.or]: {
                    codigo: {
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
            attributes: ['id', 'codigo', 'nome', 'createdAt', 'updatedAt', 'ativo'],
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [[sort_by, order_by]],
        });

        return regs;
    },
    getCidadeById: async (id) => {
        const reg = await Cidade.findByPk(id);

        return reg;
    },
    getCidadeByCodigo: async (codigo) => {
        const reg = await Cidade.findOne({
            where: {
                codigo,
            },
        });

        return reg;
    },
    deleteCidade: async (id) => {
        await Cidade.destroy({ where: { id: id } });

        return true;
    },
    getMaxCidadeByCodigo: async () => {
        return await Cidade.max('codigo');
    },
    createCidade: async (data) => {
        const { codigo } = data;

        const reg = await CidadeService.getCidadeByCodigo(codigo);
        if (reg) {
            throw new CustomError('Cidade já cadastrada com este código.', 409);
        }

        const newReg = await Cidade.create(data);

        return newReg;
    },
    updateCidade: async (id, data) => {
        const { codigo } = data;

        if (codigo) {
            const reg = await CidadeService.getCidadeByCodigo(codigo);
            if (reg && reg.id !== id) {
                throw new CustomError('Cidade já cadastrada com este código.', 409);
            }
        }

        await Cidade.update(data, { where: { id } });

        return true;
    },
};

module.exports = CidadeService;
