const path = require('path');
const express = require('express');
const paginate = require('express-paginate'); 
const multer  = require('multer');
var upload = multer({ 
	dest: './public/uploads/'
})

const controller = require('../controllers/user.controller');
// controller là một exports mà exports bản chất là một object
const validate = require('../validate/user.validate');

const router = express.Router();

router.use(paginate.middleware(10, 50));

router.get('/',controller.index);
router.get('/create',controller.create);
router.get('/edit/:id',controller.edit);
// use route parameter express 
router.get('/delete/:id',controller.delete);
router.get('/:id',controller.view);
router.post('/create',
	upload.single('avatar'),
	validate.postCreate,
	controller.postCreate
);
router.post('/edit/:id',
	upload.single('avatar'),
	validate.postEdit,
	controller.postEdit);
module.exports = router;