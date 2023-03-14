const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');


router.get('/todos', apiController.mostrarTodosAlunos);

router.get('/filtros', apiController.filtrarAlunos);

router.post('/', apiController.inserirAluno);

router.put('/:id', (req,res)=>{
    
})

router.delete('/:id', apiController.deletarAluno)

module.exports = router;