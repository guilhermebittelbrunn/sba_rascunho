const { Op } = require('sequelize');

const CustomError = require('../../utils/CustomError.cjs');

const { Pedido, PedidoItem, RC, Produto } = require('../models/index.cjs');

const numeral = require('numeral');

const PedidoService = {
    getListPedido: async (opt) => {
        let { page = 1, pageSize = 10, sort_by, order_by, filter = '', options = {} } = opt;
        //console.log(1, options);

        sort_by || (sort_by = 'createdAt');
        order_by || (order_by = 'desc');

        const regs = await Pedido.findAndCountAll({
            where: {
                // [Op.or]: {
                //     codigo: {
                //         [Op.like]: `%${filter}%`,
                //     },
                //     nome: {
                //         [Op.like]: `%${filter}%`,
                //     },
                // },
                // ...(options.inativos !== '1' && {
                //     ativo: true,
                // }),
            },
            attributes: ['id', 'numero', 'obs', 'createdAt', 'updatedAt'],
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [[sort_by, order_by]],
        });

        return regs;
    },
    getPedidoById: async (id) => {
        const reg = await Pedido.findByPk(id, {
            include: [
                {
                    model: RC,
                    attributes: ['id', 'codigo', 'nome'],
                },
                {
                    model: PedidoItem,
                    attributes: ['id', 'quanti', 'preco'],
                    as: 'itens',
                    include: [
                        {
                            model: Produto,
                            attributes: ['id', 'codigo', 'descricao'],
                        },
                    ],
                },
            ],
        });

        //console.log(reg.toJSON());

        return reg;
    },
    getPedidoByNumero: async (numero) => {
        const reg = await Pedido.findOne({
            where: {
                numero,
            },
        });

        return reg;
    },
    deletePedido: async (id) => {
        await Pedido.destroy({ where: { id: id } });

        return true;
    },
    createPedido: async (data) => {
        const { numero, auto } = data;

        if (auto) {
            const max = (await Pedido.max('numero')) || 0;
            data.numero = +max + 1;
        } else {
            const reg = await PedidoService.getPedidoByNumero(numero);
            if (reg) {
                throw new CustomError('Pedido já cadastrado com este número.', 409);
            }
        }

        data.numero = numeral(data.numero).format('0000');
        const newReg = await Pedido.create(data);

        return newReg;
    },
    updatePedido: async (id, data) => {
        const { numero, itens } = data;

        if (numero) {
            const reg = await PedidoService.getPedidoByNumero(numero);
            if (reg && reg.id !== id) {
                throw new CustomError('Pedido já cadastrado com este número.', 409);
            }
        }

        delete data.itens;
        await Pedido.update(data, { where: { id } });

        await PedidoItem.bulkCreate(
            itens.map(({ produto, quanti, preco }) => {
                return {
                    pedidoId: id,
                    produtoId: produto.id,
                    quanti,
                    preco,
                };
            })
        );

        return true;
    },
};

module.exports = PedidoService;
