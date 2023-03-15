const Produto = require('../module/Produto');

module.exports = {
    
    exibirProdutos: async(req,res)=>{

        const produtos = await Produto.findAll();
        return res.send(produtos);

    },

    buscarProduto: async(req,res)=>{
        const categoria = req.params.categoria;
        let produtos; 

        if(categoria === 'todos'){
            produtos = await Produto.findAll();
            return res.send(produtos);
        }
    
        try{
            produtos = await Produto.findAll({where: {categoria: categoria}});
            return res.send(produtos);
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
            preco: req.body.preco,
            categoria: req.body.categoria
        })
        res.redirect('/')

    },

    alterarPreco: async(req,res)=>{
        
        const id = req.query.id;
        const op = req.query.op

        try{
            const produto = await Produto.findByPk(id);
            if(op === 'adc'){
                produto.preco = parseFloat(produto.preco) + 1.0;
            }else{
                produto.preco = parseFloat(produto.preco) - 1.0;
            }
            await produto.save();
        }catch(err){
            return res.status(400).send(err);
        }
        res.send('Preço atualizado');
        
    },

    editarProduto: async(req,res)=>{
        const id = req.params.id;
        const nome = req.body.nome;
        const descricao = req.body.descricao;
        const produto = await Produto.findByPk(id);

        produto.descricao = descricao || produto.descricao;
        produto.nome = nome || produto.nome;

        await produto.save();
        res.redirect('/')
    }
}