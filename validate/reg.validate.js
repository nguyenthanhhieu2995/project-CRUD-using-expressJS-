const validator = require('validator');
const db = require('../db');

module.exports.validateRegister = (req,res,next) => {
	var errors = [];
	check = validator.isEmail(req.body.email);
	if (check == false) {
		errors.push('Email invalid');
		res.render('auth/register',{
			errors : errors ,
			values : req.body
		});
		return;
	}
	if (db.get('account').find({ email : req.body.email}).value()) {
		errors.push('Email account exists');
		res.render('auth/register',{
			errors : errors ,
			values : req.body
		});
		return;
	}
	next()
}