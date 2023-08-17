const { Cidade } = require('../module/index');
const shapefile = require('shapefile');
const path = require('path');
const path_shp = path.join(__dirname, '../shp/BR_Municipios_2022.shp');
const controller = {
    // post: async (req, res) => {
    //     // console.log(1);
    //     // try {
    //     //     await shapefile
    //     //         .open('../../assets/shp/BR_Municipios_2022.shp', undefined, { encoding: 'utf-8' })
    //     //         .then((source) =>
    //     //             source.read().then(function log(result) {
    //     //                 if (result.done) return console.log(result.done);
    //     //                 console.log(result.value);
    //     //                 return source.read().then(log);
    //     //             })
    //     //         )
    //     //         .catch((error) => console.error(error.stack));
    //     //     const newCidade = await Cidade.create({
    //     //         CD_MUN: '1710904',
    //     //         NM_MUN: 'Itapiratins',
    //     //         SIGLA_UF: 'TO',
    //     //         AREA_KM2: 1246.349,
    //     //         GEO_JSON: { type: 'Polygon', coordinates: [[Array]] },
    //     //     });
    //     //     res.send(newCidade);
    //     // } catch (err) {
    //     //     return res.send(err).status(500);
    //     // }
    //     shapefile
    //         .open(path_shp, undefined, { encoding: 'utf-8' })
    //         .then((source) =>
    //             source.read().then(async function log(result) {
    //                 if (result.done) return;
    //                 const { properties } = result.value;
    //                 await Cidade.create({
    //                     ...properties,
    //                     GEO_JSON: result.value,
    //                 });
    //                 console.log(`${properties.NM_MUN} adicionado com sucesso, estado: ${properties.SIGLA_UF}`);
    //                 return source.read().then(log);
    //             })
    //         )
    //         .catch((error) => console.error(error.stack))
    //         .finally(() => {
    //             res.send(path_shp);
    //         });
    // },
    get: async (req, res) => {
        const { id } = req.params;
        const cidades = await Cidade.findAll({
            raw: true,
            attributes: ['GEO_JSON'],
            where: {
                SIGLA_UF: id,
            },
        });
        console.log(cidades.length);
        // console.log(cidades);
        const features = cidades.map((cidade) => JSON.parse(cidade.GEO_JSON));
        res.send({ type: 'FeatureCollection', features });
    },
};

module.exports = controller;
