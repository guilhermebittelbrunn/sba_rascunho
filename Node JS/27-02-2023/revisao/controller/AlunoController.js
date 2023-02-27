const Aluno = require('../module/Aluno');

module.exports = {

    mostrarAlunos: async(req,res)=>{
        try{
            let alunos = await Aluno.find({});
            res.render('alunos', {alunos: alunos})
        }catch(err){
            console.log(err);
        }
    },

    buscarAluno: async(req,res)=>{
        let nome = req.params.nome
        try{
            let aluno = await Aluno.find({nome:nome});
            res.send(aluno);
        }catch(err){
            res.send(err);
        }
    },

    adicionarAluno: async(req,res)=>{
        let aluno = new Aluno(req.body);
        try{
           aluno.save();
           res.redirect('/todos');
           
        }catch(err){
            res.send(err)
        }
    },

    apagarAluno: async(req,res)=>{
        let id = req.params.id;
        console.log('teste, cheguei ' + id)
        let aluno = Aluno.find({id})
        res.send(aluno)
    }

}

