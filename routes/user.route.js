const express = require('express');

const controller = require('../controllers/user.controller');
// controller là một exports mà exports bản chất là một object

const router = express.Router();

router.get('/',controller.index);
router.get('/search',controller.search);
router.get('/create',controller.create);
// use route parameter express 
router.get('/:id',controller.view);
router.post('/create',controller.postCreate);

module.exports = router;