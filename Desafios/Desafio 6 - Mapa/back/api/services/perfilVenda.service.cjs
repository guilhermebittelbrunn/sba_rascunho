const { Op } = require('sequelize');

const CustomError = require('../../utils/CustomError.cjs');

const { PerfilVenda, TabelaPreco, Colecao } = require('../models/index.cjs');

const numeral = require('numeral');

const PerfilVendaService = {
    getListPerfilVenda: async (opt) => {
        let { page = 1, pageSize = 10, sort_by, order_by, filter = '', options = {} } = opt;
        //console.log(1, options);

        sort_by || (sort_by = 'createdAt');
        order_by || (order_by = 'desc');

        const regs = await PerfilVenda.findAndCountAll({
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
    getPerfilVendaById: async (id) => {
        const reg = await PerfilVenda.findByPk(id, {
            include: [
                {
                    model: TabelaPreco,
                    attributes: ['id', 'codigo', 'descricao'],
                },
                {
                    model: Colecao,
                    attributes: ['id', 'codigo', 'descricao'],
                    as: 'colecoes',
                    through: { attributes: [] },
                },
            ],
        });

        return reg;
    },
    getPerfilVendaByCodigo: async (codigo) => {
        const reg = await PerfilVenda.findOne({
            where: {
                codigo,
            },
        });

        return reg;
    },
    deletePerfilVenda: async (id) => {
        await PerfilVenda.destroy({ where: { id: id } });

        return true;
    },
    getMaxPerfilVendaByCodigo: async () => {
        return await PerfilVenda.max('codigo');
    },
    createPerfilVenda: async (data) => {
        const { codigo, auto, colecoes } = data;

        if (auto) {
            const max = (await PerfilVendaService.getMaxPerfilVendaByCodigo()) || 0;
            data.codigo = +max + 1;
        } else {
            const reg = await PerfilVendaService.getPerfilVendaByCodigo(codigo);
            if (reg) {
                throw new CustomError('Perfil de Venda já cadastrado com este código.', 409);
            }
        }

        data.codigo = numeral(data.codigo).format('000');
        const newReg = await PerfilVenda.create(data);
        newReg.setColecoes(colecoes);

        return newReg;
    },
    updatePerfilVenda: async (id, data) => {
        const { codigo, colecoes } = data;

        if (codigo) {
            const reg = await PerfilVendaService.getPerfilVendaByCodigo(codigo);
            if (reg && reg.id !== id) {
                throw new CustomError('Perfil de Venda já cadastrado com este código.', 409);
            }
        }

        const reg = await PerfilVendaService.getPerfilVendaById(id);
        //await PerfilVenda.update(data, { where: { id } });
        await reg.update(data);
        await reg.setColecoes(colecoes);

        return true;
    },
};

module.exports = PerfilVendaService;
