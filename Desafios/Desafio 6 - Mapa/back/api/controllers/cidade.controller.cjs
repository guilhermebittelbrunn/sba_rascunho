const shapefile = require('shapefile');

const { CidadeService } = require('../services/index.cjs');

const { Cidade } = require('../models/index.cjs');

const CidadeController = {
    listCidade: async (req, res) => {
        const { page, pageSize, sort_by, order_by, filter, options } = req.query;

        const regs = await CidadeService.getListCidade({
            page,
            pageSize,
            sort_by,
            order_by,
            filter,
            options,
        });

        res.send(regs);
    },
    getCidade: async (req, res) => {
        const { id } = req.params;

        const reg = await CidadeService.getCidadeById(id);

        res.send(reg);
    },
    deleteCidade: async (req, res) => {
        const { id } = req.params;

        await CidadeService.deleteCidade(id);

        res.send({ ok: true });
    },
    postCidade: async (req, res) => {
        const { codigo, nome, ativo } = req.body;

        const newReg = await CidadeService.createCidade({
            codigo,
            nome,
            ativo,
        });

        res.send(newReg);
    },
    putCidade: async (req, res) => {
        const { id } = req.params;
        const { codigo, nome, ativo } = req.body;

        await CidadeService.updateCidade(id, {
            codigo,
            nome,
            ativo,
        });

        res.send({ ok: true });
    },
    carregaCidade: async (req, res) => {
        shapefile
            .open('C:\\temp\\BR_Municipios_2022.shp', 'C:\\temp\\BR_Municipios_2022.dbf', {
                encoding: 'utf8',
            })
            .then((source) =>
                source.read().then(function log(result) {
                    if (result.done) return;
                    console.log(result.value);

                    if (result.value.properties.SIGLA_UF === 'SC') {
                        Cidade.create({
                            codigo: result.value.properties.CD_MUN,
                            nome: result.value.properties.NM_MUN,
                            uf: result.value.properties.SIGLA_UF,
                            area: result.value.properties.AREA_KM2,
                            geojson: result.value,
                            ativo: true,
                        });
                    }

                    return source.read().then(log);
                })
            )
            .catch((error) => console.error(error.stack));

        res.send({ ok: true });
    },
};

module.exports = CidadeController;
