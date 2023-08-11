const { Op } = require('sequelize');

const CustomError = require('../../utils/CustomError.cjs');

const { Regiao, Cidade } = require('../models/index.cjs');

const numeral = require('numeral');

const RegiaoService = {
    getListRegiao: async (opt) => {
        let { page = 1, pageSize = 10, sort_by, order_by, filter = '', options = {} } = opt;
        //console.log(1, options);

        sort_by || (sort_by = 'createdAt');
        order_by || (order_by = 'desc');

        const regs = await Regiao.findAndCountAll({
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
    getRegiao: async () => {
        const rgs = await Cidade.findAll({
            raw: true,
            // include: [
            //     {
            //         model: Cidade,
            //         attributes: ['id', 'codigo', 'nome', 'geojson'],
            //         as: 'cidades',
            //         through: { attributes: [] },
            //     },
            // ],
        });
        return rgs;
    },
    getRegiaoById: async (id, opt = {}) => {
        const reg = await Regiao.findByPk(id, {
            include: [
                {
                    model: Cidade,
                    attributes: ['id', 'codigo', 'nome', ...(opt.geojson === '1' ? ['geojson'] : [])],
                    as: 'cidades',
                    through: { attributes: [] },
                },
            ],
        });

        return reg;
    },
    getRegiaoByCodigo: async (codigo) => {
        const reg = await Regiao.findOne({
            where: {
                codigo,
            },
        });

        return reg;
    },
    deleteRegiao: async (id) => {
        await Regiao.destroy({ where: { id: id } });

        return true;
    },
    getMaxRegiaoByCodigo: async () => {
        return await Regiao.max('codigo');
    },
    createRegiao: async (data) => {
        const { codigo, auto, cidades } = data;

        if (auto) {
            const max = (await RegiaoService.getMaxRegiaoByCodigo()) || 0;
            data.codigo = +max + 1;
        } else {
            const reg = await RegiaoService.getRegiaoByCodigo(codigo);
            if (reg) {
                throw new CustomError('Região já cadastrada com este código.', 409);
            }
        }

        data.codigo = numeral(data.codigo).format('0000');
        const newReg = await Regiao.create(data);
        newReg.setCidades(cidades);

        return newReg;
    },
    updateRegiao: async (id, data) => {
        const { codigo, cidades } = data;

        if (codigo) {
            const reg = await RegiaoService.getRegiaoByCodigo(codigo);
            if (reg && reg.id !== id) {
                throw new CustomError('Região já cadastrada com este código.', 409);
            }
        }

        const reg = await Regiao.findByPk(id);
        //await Regiao.update(data, { where: { id } });
        await reg.update(data);
        await reg.setCidades(cidades);

        return true;
    },
};

module.exports = RegiaoService;
