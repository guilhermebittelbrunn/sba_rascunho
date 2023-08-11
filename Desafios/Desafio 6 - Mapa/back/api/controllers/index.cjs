const ProdutoController = require('./produto.controller.cjs');
const ColecaoController = require('./colecao.controller.cjs');
const RCController = require('./rc.controller.cjs');
const TabelaPrecoController = require('./tabelaPreco.controller.cjs');
const PerfilVendaController = require('./perfilVenda.controller.cjs');
const RegiaoController = require('./regiao.controller.cjs');
const CidadeController = require('./cidade.controller.cjs');
const UsuarioController = require('./usuario.controller.cjs');
const PedidoController = require('./pedido.controller.cjs');

module.exports = {
    PedidoController,
    UsuarioController,
    CidadeController,
    RegiaoController,
    PerfilVendaController,
    TabelaPrecoController,
    RCController,
    ColecaoController,
    ProdutoController,
};
