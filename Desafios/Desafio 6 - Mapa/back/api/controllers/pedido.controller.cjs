const { PedidoService } = require('../services/index.cjs');

const PedidoController = {
    listPedido: async (req, res) => {
        const { page, pageSize, sort_by, order_by, filter, options } = req.query;

        const regs = await PedidoService.getListPedido({
            page,
            pageSize,
            sort_by,
            order_by,
            filter,
            options,
        });

        res.send(regs);
    },
    getPedido: async (req, res) => {
        const { id } = req.params;

        const reg = await PedidoService.getPedidoById(id);

        res.send(reg);
    },
    deletePedido: async (req, res) => {
        const { id } = req.params;

        await PedidoService.deletePedido(id);

        res.send({ ok: true });
    },
    postPedido: async (req, res) => {
        const { numero, obs, dataEmissao, auto, rcId } = req.body;

        const newReg = await PedidoService.createPedido({
            auto,
            numero,
            obs,
            dataEmissao,
            rcId,
        });

        res.send(newReg);
    },
    putPedido: async (req, res) => {
        const { id } = req.params;
        const { numero, obs, dataEmissao, rcId, itens } = req.body;

        await PedidoService.updatePedido(id, {
            numero,
            obs,
            dataEmissao,
            rcId,
            itens,
        });

        res.send({ ok: true });
    },
};

module.exports = PedidoController;
