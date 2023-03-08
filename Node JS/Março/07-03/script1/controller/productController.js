const Produto = require('../module/Produto');

module.exports = {
    
    exibirProdutos: async(req,res)=>{
    
        let produtos = await Produto.findAll();
    
        return res.send(produtos);
    
    },

    buscarProduto: async(req,res)=>{
        let nome = req.params.nome;

        if(nome =='todos'){
            let produtos = await Produto.findAll();
            return res.send(produtos);
        }
    
        try{
            let produto = await Produto.findAll({where: {nome: nome}});
            return res.send(produto);
        }catch(err){
            return res.status(400).send(err);
        }
    },

    deletarProduto: async(req,res)=>{

        const id = req.params.id;
        const produto = await Produto.findByPk(id);
    
        try{
            await produto.destroy();
        }catch(err){
            return res.status(500).send(err);
        }
    
        res.send('Item apagado com sucesso');
    },

    adicionarProduto: async(req,res)=>{
    
        await Produto.create({
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco
        })
        res.redirect('/')

    },

    aumentarPreco: async(req,res)=>{
        
        let id = req.params.id;
        
        try{
            let produto = await Produto.findByPk(id);
            produto.preco = parseFloat(produto.preco) +  1.0;
            await produto.save();
        }catch(err){
            return res.status(500).send(err);
        }
        res.send('Preço atualizado');

    },

    diminuirPreco: async(req,res)=>{

        let id = req.params.id;
        
        try{
            let produto = await Produto.findByPk(id);
            produto.preco = parseFloat(produto.preco) -  1.0;
            await produto.save();
        }catch(err){
            return res.status(500).send(err);
        }
        res.send('Preço atualizado');
    },

    editarProduto: async(req,res)=>{
        let teste = req.body
        let id = req.params.id;
        let nome = req.body.nome;
        let descricao = req.body.descricao;

        console.log(id, nome, descricao, teste);
        res.redirect('/')
    }
    
    
}