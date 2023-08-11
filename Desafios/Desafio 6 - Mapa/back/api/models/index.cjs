const sequelize = require('../../utils/sequelize.cjs');

const Produto = require('./produto.model.cjs');
const Colecao = require('./colecao.model.cjs');
const Cliente = require('./cliente.model.cjs');
const Pedido = require('./pedido.model.cjs');
const PedidoItem = require('./pedidoItem.model.cjs');
const TabelaPreco = require('./tabelaPreco.model.cjs');
const Preco = require('./preco.model.cjs');
const PerfilVenda = require('./perfilVenda.model.cjs');
const Cidade = require('./cidade.model.cjs');
const Regiao = require('./regiao.model.cjs');
const RC = require('./rc.model.cjs');
const Usuario = require('./usuario.model.cjs');

sequelize.sync({ force: false, match: /_test$/ }).then(() => {
    console.log('All models were synchronized successfully.');

    (async () => {
        // const reg = await User.findOne({
        //     where: {
        //         username: 'admin@admin.com',
        //     },
        // });
        // if (!reg) {
        //     const reg = await User.create({
        //         username: 'admin@admin.com',
        //         name: 'Admin',
        //         admin: true,
        //         uid: remoteUser.uid,
        //     });
        // }
    })();
});

module.exports = {
    Produto,
    Colecao,
    Cliente,
    Pedido,
    PedidoItem,
    RC,
    TabelaPreco,
    Preco,
    PerfilVenda,
    Cidade,
    Regiao,
    Usuario,
};
