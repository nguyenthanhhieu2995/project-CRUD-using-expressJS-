const express = require('express');
const paginate = require('express-paginate'); 

const controller = require('../controllers/user.controller');
// controller là một exports mà exports bản chất là một object
const validate = require('../validate/user.validate');

const router = express.Router();

router.use(paginate.middleware(10, 50));

router.get('/',controller.index);
router.get('/search',controller.search);
router.get('/create',controller.create);
router.get('/edit/:id',controller.edit);
// use route parameter express 
router.get('/delete/:id',controller.delete);
router.get('/:id',controller.view);
router.post('/create',validate.postCreate,controller.postCreate);
router.post('/edit/:id',controller.postEdit);
module.exports = router;