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

        let id = req.params.id
        console.log(id);
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
        console.log('Item adicionado com sucesso');
    
        res.redirect('/')
    },

    aumentarPreco: async(req,res)=>{
        
        let id = req.params.id;
        
        try{
            let produto = await Produto.findByPk(id);
            produto.preco = parseFloat(produto.preco) +  1.0;
            produto.save();
        }catch(err){
            console.log(err);
        }

        res.send('Preço atualizado');

    },

    diminuirPreco: async(req,res)=>{
        let id = req.params.id;
        
        try{
            let produto = await Produto.findByPk(id);
            produto.preco = parseFloat(produto.preco) -  1.0;
            produto.save();
        }catch(err){
            console.log(err);
        }

        res.send('Preço atualizado');
    }
    
}