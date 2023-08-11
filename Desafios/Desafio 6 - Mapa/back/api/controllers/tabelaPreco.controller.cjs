const { TabelaPrecoService } = require('../services/index.cjs');

const TabelaPrecoController = {
    listTabelaPreco: async (req, res) => {
        const { page, pageSize, sort_by, order_by, filter, options } = req.query;

        const regs = await TabelaPrecoService.getListTabelaPreco({
            page,
            pageSize,
            sort_by,
            order_by,
            filter,
            options,
        });

        res.send(regs);
    },
    getTabelaPreco: async (req, res) => {
        const { id } = req.params;

        const reg = await TabelaPrecoService.getTabelaPrecoById(id);

        res.send(reg);
    },
    deleteTabelaPreco: async (req, res) => {
        const { id } = req.params;

        await TabelaPrecoService.deleteTabelaPreco(id);

        res.send({ ok: true });
    },
    postTabelaPreco: async (req, res) => {
        const { codigo, descricao, ativo, auto } = req.body;

        const newReg = await TabelaPrecoService.createTabelaPreco({
            auto,
            codigo,
            descricao,
            ativo,
        });

        res.send(newReg);
    },
    putTabelaPreco: async (req, res) => {
        const { id } = req.params;
        const { codigo, descricao, ativo } = req.body;

        await TabelaPrecoService.updateTabelaPreco(id, {
            codigo,
            descricao,
            ativo,
        });

        res.send({ ok: true });
    },
};

module.exports = TabelaPrecoController;
