const { Op } = require('sequelize');

const CustomError = require('../../utils/CustomError.cjs');

const { Produto, Colecao } = require('../models/index.cjs');

const numeral = require('numeral');

const ProdutoService = {
    getListProduto: async (opt) => {
        let { page = 1, pageSize = 10, sort_by, order_by, filter = '', options = {} } = opt;

        sort_by || (sort_by = 'createdAt');
        order_by || (order_by = 'desc');
        options.colecoes = JSON.parse(options.colecoes || null);

        const regs = await Produto.findAndCountAll({
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
                ...(options.colecoes &&
                    options.colecoes.length > 0 && {
                        colecaoId: {
                            [Op.in]: options.colecoes.map((item) => item.value),
                        },
                    }),
            },
            attributes: ['id', 'codigo', 'descricao', 'createdAt', 'updatedAt', 'ativo'],
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [[sort_by, order_by]],
            include: {
                model: Colecao,
                attributes: ['id', 'codigo', 'descricao'],
            },
        });

        return regs;
    },
    getProdutoById: async (id) => {
        const reg = await Produto.findByPk(id, {
            include: {
                model: Colecao,
                attributes: ['id', 'codigo', 'descricao'],
            },
        });

        return reg;
    },
    getProdutoByCodigo: async (codigo) => {
        const reg = await Produto.findOne({
            where: {
                codigo,
            },
        });

        return reg;
    },
    deleteProduto: async (id) => {
        await Produto.destroy({ where: { id: id } });

        return true;
    },
    createProduto: async (data) => {
        const { codigo, auto } = data;

        const reg = await ProdutoService.getProdutoByCodigo(codigo);
        if (reg) {
            throw new CustomError('Produto já cadastrado com este código.', 409);
        }

        const newReg = await Produto.create(data);

        return newReg;
    },
    updateProduto: async (id, data) => {
        const { codigo } = data;

        if (codigo) {
            const reg = await ProdutoService.getProdutoByCodigo(codigo);
            if (reg && reg.id !== id) {
                throw new CustomError('Produto já cadastrado com este código.', 409);
            }
        }

        await Produto.update(data, { where: { id } });

        return true;
    },
};

module.exports = ProdutoService;
