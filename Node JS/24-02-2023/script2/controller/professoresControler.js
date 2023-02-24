const Professor = require('../module/Professor');

module.exports = { 

    buscarProfessor: async(req,res)=>{
        let nome = req.params.nome;
    
        try{
            let professor = await Professor.find({nome: nome});
            res.send(professor);
        }catch(err){
            res.send(err)
        }
    },

    adicionarProfessor: async(req,res)=>{

        let professor = new Professor(req.body);

        try{
            await professor.save();
            res.redirect('/professores/todos');
        }catch(err){
            res.send(err);
        }

    },

    mostrarProfessores: async(req,res)=>{

        try{
            let professores = await Professor.find({});
            res.render('todos', {professores: professores})
        }catch(err){
            console.log(err);
            res.send(err);
        }

    },

    deleteProfessor: async(req,res)=>{
        let id = req.params.id

        try{
            await Professor.findByIdAndDelete(id);
            res.redirect('/professor/todos');

        }catch(err){
            console.log(err);
        }
    
    }
}