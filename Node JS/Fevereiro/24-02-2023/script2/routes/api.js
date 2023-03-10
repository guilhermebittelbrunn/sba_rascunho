const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
const Professor = require('../module/Professor');
const controller = require('../controller/professoresControler');

router.use(methodOverride('_method'));

router.get('/', (req,res)=>{
    res.render('index', {titulo: 'titulo-teste'});
})
router.post('/', express.urlencoded({extended:true}),controller.adicionarProfessor)

router.get('/todos', controller.mostrarProfessores);

router.get('/:nome', controller.buscarProfessor);

router.delete('delete/:id', express.urlencoded({extended:true}),controller.deleteProfessor);

module.exports = router;