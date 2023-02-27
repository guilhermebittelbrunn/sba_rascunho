const express = require('express');
const router = express.Router();
const controller = require('../controller/AlunoController');
const methodOverride = require('method-override')

router.use(methodOverride('X-HTTP-Method-Override'))

router.get('/', (req,res)=>{
    res.render('index.ejs')
})


router.get('/todos', controller.mostrarAlunos);

router.get('/:nome', controller.buscarAluno);

router.delete('/:id', express.urlencoded({extended:true}), controller.apagarAluno);

router.post('/', express.urlencoded({extended:true}), controller.adicionarAluno);




module.exports = router;