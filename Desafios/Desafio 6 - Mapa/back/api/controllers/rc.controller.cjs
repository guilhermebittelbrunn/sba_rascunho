const { RCService } = require('../services/index.cjs');

const RCController = {
    listRC: async (req, res) => {
        const { page, pageSize, sort_by, order_by, filter, options } = req.query;

        const regs = await RCService.getListRC({
            page,
            pageSize,
            sort_by,
            order_by,
            filter,
            options,
        });

        res.send(regs);
    },
    getRC: async (req, res) => {
        const { id } = req.params;

        const reg = await RCService.getRCById(id);

        res.send(reg);
    },
    deleteRC: async (req, res) => {
        const { id } = req.params;

        await RCService.deleteRC(id);

        res.send({ ok: true });
    },
    postRC: async (req, res) => {
        const { codigo, nome, ativo, auto, perfisVenda } = req.body;

        const newReg = await RCService.createRC({
            auto,
            codigo,
            nome,
            ativo,
            perfisVenda,
        });

        res.send(newReg);
    },
    putRC: async (req, res) => {
        const { id } = req.params;
        const { codigo, nome, ativo, perfisVenda } = req.body;

        await RCService.updateRC(id, {
            codigo,
            nome,
            ativo,
            perfisVenda,
        });

        res.send({ ok: true });
    },
    syncRC: async (req, res) => {
        const { id } = req.params;

        await RCService.syncRC(id);

        res.send({ ok: true });
    },
};

module.exports = RCController;
