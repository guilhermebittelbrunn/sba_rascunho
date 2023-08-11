const ColecaoService = require('./colecao.service.cjs');
const ProdutoService = require('./produto.service.cjs');
const RCService = require('./rc.service.cjs');
const TabelaPrecoService = require('./tabelaPreco.service.cjs');
const PerfilVendaService = require('./perfilVenda.service.cjs');
const RegiaoService = require('./regiao.service.cjs');
const CidadeService = require('./cidade.service.cjs');
const UsuarioService = require('./usuario.service.cjs');
const PedidoService = require('./pedido.service.cjs');

module.exports = {
    PedidoService,
    UsuarioService,
    CidadeService,
    RegiaoService,
    PerfilVendaService,
    TabelaPrecoService,
    RCService,
    ProdutoService,
    ColecaoService,
};
