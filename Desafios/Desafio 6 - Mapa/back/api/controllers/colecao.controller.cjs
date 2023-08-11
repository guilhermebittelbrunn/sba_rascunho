const { ColecaoService } = require('../services/index.cjs');

const ColecaoController = {
    listColecao: async (req, res) => {
        const { page, pageSize, sort_by, order_by, filter, options } = req.query;

        const regs = await ColecaoService.getListColecao({
            page,
            pageSize,
            sort_by,
            order_by,
            filter,
            options,
        });

        res.send(regs);
    },
    getColecao: async (req, res) => {
        const { id } = req.params;

        const reg = await ColecaoService.getColecaoById(id);

        res.send(reg);
    },
    deleteColecao: async (req, res) => {
        const { id } = req.params;

        await ColecaoService.deleteColecao(id);

        res.send({ ok: true });
    },
    postColecao: async (req, res) => {
        const { codigo, descricao, ativo, auto } = req.body;

        const newReg = await ColecaoService.createColecao({
            auto,
            codigo,
            descricao,
            ativo,
        });

        res.send(newReg);
    },
    putColecao: async (req, res) => {
        const { id } = req.params;
        const { codigo, descricao, ativo } = req.body;

        await ColecaoService.updateColecao(id, {
            codigo,
            descricao,
            ativo,
        });

        res.send({ ok: true });
    },
};

module.exports = ColecaoController;
