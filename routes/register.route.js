const express = require('express');

const controller = require('../controllers/reg.controller');
const validate = require('../validate/reg.validate');

const router = express.Router();

router.get('/',controller.register);
router.post('/',validate.validateRegister,controller.postRegister);

module.exports = router;