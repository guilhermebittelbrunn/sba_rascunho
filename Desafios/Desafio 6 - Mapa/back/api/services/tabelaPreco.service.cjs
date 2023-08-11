const { Op } = require('sequelize');

const CustomError = require('../../utils/CustomError.cjs');

const { TabelaPreco } = require('../models/index.cjs');

const numeral = require('numeral');

const TabelaPrecoService = {
    getListTabelaPreco: async (opt) => {
        let { page = 1, pageSize = 10, sort_by, order_by, filter = '', options = {} } = opt;
        //console.log(1, options);

        sort_by || (sort_by = 'createdAt');
        order_by || (order_by = 'desc');

        const regs = await TabelaPreco.findAndCountAll({
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
    getTabelaPrecoById: async (id) => {
        const reg = await TabelaPreco.findByPk(id);

        return reg;
    },
    getTabelaPrecoByCodigo: async (codigo) => {
        const reg = await TabelaPreco.findOne({
            where: {
                codigo,
            },
        });

        return reg;
    },
    deleteTabelaPreco: async (id) => {
        await TabelaPreco.destroy({ where: { id: id } });

        return true;
    },
    getMaxTabelaPrecoByCodigo: async () => {
        return await TabelaPreco.max('codigo');
    },
    createTabelaPreco: async (data) => {
        const { codigo, auto } = data;

        if (auto) {
            const max = (await TabelaPrecoService.getMaxTabelaPrecoByCodigo()) || 0;
            data.codigo = +max + 1;
        } else {
            const reg = await TabelaPrecoService.getTabelaPrecoByCodigo(codigo);
            if (reg) {
                throw new CustomError('Tabela de Preço já cadastrada com este código.', 409);
            }
        }

        data.codigo = numeral(data.codigo).format('000');
        const newReg = await TabelaPreco.create(data);

        return newReg;
    },
    updateTabelaPreco: async (id, data) => {
        const { codigo } = data;

        if (codigo) {
            const reg = await TabelaPrecoService.getTabelaPrecoByCodigo(codigo);
            if (reg && reg.id !== id) {
                throw new CustomError('Tabela de Preço já cadastrada com este código.', 409);
            }
        }

        await TabelaPreco.update(data, { where: { id } });

        return true;
    },
};

module.exports = TabelaPrecoService;
