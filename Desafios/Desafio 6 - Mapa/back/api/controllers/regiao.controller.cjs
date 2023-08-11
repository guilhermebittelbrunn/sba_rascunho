const { RegiaoService } = require('../services/index.cjs');

const RegiaoController = {
    listRegiao: async (req, res) => {
        const { page, pageSize, sort_by, order_by, filter, options } = req.query;

        const regs = await RegiaoService.getListRegiao({
            page,
            pageSize,
            sort_by,
            order_by,
            filter,
            options,
        });

        res.send(regs);
    },
    getAllRegiao: async (req, res) => {
        const rgs = await RegiaoService.getRegiao();
        res.send(rgs);
    },

    getRegiao: async (req, res) => {
        const { id } = req.params;
        const { geojson } = req.query;

        const reg = await RegiaoService.getRegiaoById(id, {
            geojson,
        });

        res.send(reg);
    },
    deleteRegiao: async (req, res) => {
        const { id } = req.params;

        await RegiaoService.deleteRegiao(id);

        res.send({ ok: true });
    },
    postRegiao: async (req, res) => {
        const { codigo, descricao, ativo, auto, cidades } = req.body;

        const newReg = await RegiaoService.createRegiao({
            auto,
            codigo,
            descricao,
            ativo,
            cidades,
        });

        res.send(newReg);
    },
    putRegiao: async (req, res) => {
        const { id } = req.params;
        const { codigo, descricao, ativo, cidades } = req.body;

        await RegiaoService.updateRegiao(id, {
            codigo,
            descricao,
            ativo,
            cidades,
        });

        res.send({ ok: true });
    },
};

module.exports = RegiaoController;
