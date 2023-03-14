
const Aluno = require('../module/Aluno');

const Controller = {

    inserirAluno: async (req,res)=>{
        const novo_aluno = {
            nome: req.body.nome,
            idade: req.body.idade,
            situacao: req.body.situacao,
            observacao: req.body.observacao,
            periodo: req.body.periodo
        }

        try{
            await Aluno.create(novo_aluno);
            res.redirect('/');
        }catch(err){
            return res.status(400).send(err);
        }

    },

    mostrarTodosAlunos: async(req,res)=>{

        let alunos = await Aluno.findAll();
        res.send(alunos);
    
    },

    deletarAluno: async(req,res)=>{

        const id = req.params.id;
    
        try{
            await Aluno.destroy({where:{id: id}});
            res.status(200).send('Aluno removido com sucesso');
        }catch(err){
            res.status(400).send(err);
        }

    },

    filtrarAlunos: async(req,res)=>{
        let filtro = req.params.slice('|');
        console.log(filtro);
        console.log('cheguei na api');
        
        res.send('teste')
        
    }

}

module.exports = Controller;