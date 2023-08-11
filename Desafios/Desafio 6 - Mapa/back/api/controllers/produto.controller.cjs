const { ProdutoService } = require('../services/index.cjs');

const ProdutoController = {
    listProduto: async (req, res) => {
        const { page, pageSize, sort_by, order_by, filter, options } = req.query;

        const regs = await ProdutoService.getListProduto({
            page,
            pageSize,
            sort_by,
            order_by,
            filter,
            options,
        });

        res.send(regs);
    },
    getProduto: async (req, res) => {
        const { id } = req.params;

        const reg = await ProdutoService.getProdutoById(id);

        res.send(reg);
    },
    deleteProduto: async (req, res) => {
        const { id } = req.params;

        await ProdutoService.deleteProduto(id);

        res.send({ ok: true });
    },
    postProduto: async (req, res) => {
        const { codigo, descricao, ativo, preco, data, auto, colecaoId } = req.body;

        const newReg = await ProdutoService.createProduto({
            auto,
            codigo,
            descricao,
            ativo,
            preco,
            data,
            colecaoId,
        });

        res.send(newReg);
    },
    putProduto: async (req, res) => {
        const { id } = req.params;
        const { codigo, descricao, ativo, preco, data, colecaoId } = req.body;

        await ProdutoService.updateProduto(id, {
            codigo,
            descricao,
            ativo,
            preco,
            data,
            colecaoId,
        });

        res.send({ ok: true });
    },
};

module.exports = ProdutoController;
