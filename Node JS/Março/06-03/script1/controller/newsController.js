const Notice = require('../module/notice');


module.exports = {


    adicionarNoticia: async(req, res)=>{
        let noticia = {
            title: req.body.title,
            description: req.body.description
        }

        noticia = new Notice(noticia);

        try{
            await noticia.save();
            res.send('Item adicionado com sucesso');
        }catch(err){
            res.send(err);
        }
    },

    exibirNoticias: async(req,res)=>{
        let allNews = await Notice.find({});
        res.send(allNews);
    }




}