const { PerfilVendaService } = require('../services/index.cjs');

const PerfilVendaController = {
    listPerfilVenda: async (req, res) => {
        const { page, pageSize, sort_by, order_by, filter, options } = req.query;

        const regs = await PerfilVendaService.getListPerfilVenda({
            page,
            pageSize,
            sort_by,
            order_by,
            filter,
            options,
        });

        res.send(regs);
    },
    getPerfilVenda: async (req, res) => {
        const { id } = req.params;

        const reg = await PerfilVendaService.getPerfilVendaById(id);

        res.send(reg);
    },
    deletePerfilVenda: async (req, res) => {
        const { id } = req.params;

        await PerfilVendaService.deletePerfilVenda(id);

        res.send({ ok: true });
    },
    postPerfilVenda: async (req, res) => {
        const {
            codigo,
            descricao,
            ativo,
            auto,
            dataInicio,
            dataFim,
            valorMinimo,
            qtdeMinima,
            tabelaPrecoId,
            colecoes,
        } = req.body;

        const newReg = await PerfilVendaService.createPerfilVenda({
            auto,
            codigo,
            descricao,
            ativo,
            dataInicio,
            dataFim,
            valorMinimo,
            qtdeMinima,
            tabelaPrecoId,
            colecoes,
        });

        res.send(newReg);
    },
    putPerfilVenda: async (req, res) => {
        const { id } = req.params;
        const { codigo, descricao, ativo, dataInicio, dataFim, valorMinimo, qtdeMinima, tabelaPrecoId, colecoes } =
            req.body;

        await PerfilVendaService.updatePerfilVenda(id, {
            codigo,
            descricao,
            ativo,
            dataInicio,
            dataFim,
            valorMinimo,
            qtdeMinima,
            tabelaPrecoId,
            colecoes,
        });

        res.send({ ok: true });
    },
};

module.exports = PerfilVendaController;
