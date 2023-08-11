const numeral = require('numeral');
require('numeral/locales');
numeral.locale('pt-br');

const express = require('express');

const router = express.Router();

const {
    ProdutoController,
    ColecaoController,
    RCController,
    TabelaPrecoController,
    PerfilVendaController,
    CidadeController,
    RegiaoController,
    UsuarioController,
    PedidoController,
} = require('./controllers/index.cjs');

const verifyToken = async (req, res, next) => {
    next();
};

router.get('/produtos', verifyToken, ProdutoController.listProduto);
router.get('/produtos/:id', verifyToken, ProdutoController.getProduto);
router.delete('/produtos/:id', verifyToken, ProdutoController.deleteProduto);
router.post('/produtos', verifyToken, ProdutoController.postProduto);
router.put('/produtos/:id', verifyToken, ProdutoController.putProduto);

router.get('/colecoes', verifyToken, ColecaoController.listColecao);
router.get('/colecoes/:id', verifyToken, ColecaoController.getColecao);
router.delete('/colecoes/:id', verifyToken, ColecaoController.deleteColecao);
router.post('/colecoes', verifyToken, ColecaoController.postColecao);
router.put('/colecoes/:id', verifyToken, ColecaoController.putColecao);

router.get('/rcs', verifyToken, RCController.listRC);
router.get('/rcs/:id', verifyToken, RCController.getRC);
router.delete('/rcs/:id', verifyToken, RCController.deleteRC);
router.post('/rcs', verifyToken, RCController.postRC);
router.put('/rcs/:id', verifyToken, RCController.putRC);
router.put('/rcs/:id/sync', verifyToken, RCController.syncRC);

router.get('/tabelasPreco', verifyToken, TabelaPrecoController.listTabelaPreco);
router.get('/tabelasPreco/:id', verifyToken, TabelaPrecoController.getTabelaPreco);
router.delete('/tabelasPreco/:id', verifyToken, TabelaPrecoController.deleteTabelaPreco);
router.post('/tabelasPreco', verifyToken, TabelaPrecoController.postTabelaPreco);
router.put('/tabelasPreco/:id', verifyToken, TabelaPrecoController.putTabelaPreco);

router.get('/perfisVenda', verifyToken, PerfilVendaController.listPerfilVenda);
router.get('/perfisVenda/:id', verifyToken, PerfilVendaController.getPerfilVenda);
router.delete('/perfisVenda/:id', verifyToken, PerfilVendaController.deletePerfilVenda);
router.post('/perfisVenda', verifyToken, PerfilVendaController.postPerfilVenda);
router.put('/perfisVenda/:id', verifyToken, PerfilVendaController.putPerfilVenda);

router.get('/cidades/carrega', verifyToken, CidadeController.carregaCidade);
router.get('/cidades', verifyToken, CidadeController.listCidade);
router.get('/cidades/:id', verifyToken, CidadeController.getCidade);
router.delete('/cidades/:id', verifyToken, CidadeController.deleteCidade);
router.post('/cidades', verifyToken, CidadeController.postCidade);
router.put('/cidades/:id', verifyToken, CidadeController.putCidade);

router.get('/regioes/all', RegiaoController.getAllRegiao);
router.get('/regioes', verifyToken, RegiaoController.listRegiao);
router.get('/regioes/:id', verifyToken, RegiaoController.getRegiao);
router.delete('/regioes/:id', verifyToken, RegiaoController.deleteRegiao);
router.post('/regioes', verifyToken, RegiaoController.postRegiao);
router.put('/regioes/:id', verifyToken, RegiaoController.putRegiao);

router.get('/usuarios', verifyToken, UsuarioController.listUsuario);
router.get('/usuarios/:id', verifyToken, UsuarioController.getUsuario);
router.delete('/usuarios/:id', verifyToken, UsuarioController.deleteUsuario);
router.post('/usuarios', verifyToken, UsuarioController.postUsuario);
router.put('/usuarios/:id', verifyToken, UsuarioController.putUsuario);

router.post('/login', verifyToken, UsuarioController.loginUsuario);

router.get('/pedidos', verifyToken, PedidoController.listPedido);
router.get('/pedidos/:id', verifyToken, PedidoController.getPedido);
router.delete('/pedidos/:id', verifyToken, PedidoController.deletePedido);
router.post('/pedidos', verifyToken, PedidoController.postPedido);
router.put('/pedidos/:id', verifyToken, PedidoController.putPedido);

module.exports = router;

/*

GET http://localhost:3000/api/cidades/carrega HTTP/1.1

GET http://localhost:3000/api/produtos?page=1&pageSize=1 HTTP/1.1

GET http://localhost:3000/api/produtos/199cfe05-8a4c-4543-bd07-3f31f8a350cb HTTP/1.1

POST http://localhost:3000/api/produtos HTTP/1.1
content-type: application/json

{
    "codigo": "1234",
    "descricao": "12341234",
    "ativo": true
}

PUT http://localhost:3000/api/produtos/199cfe05-8a4c-4543-bd07-3f31f8a350cb HTTP/1.1
content-type: application/json

{
    "codigo": "1234",
    "descricao": "11111111",
    "ativo": true
}



*/
