var validator = require('validator');

module.exports.validateRegister = (req,res,next) => {
	var errors = [];
	check = validator.isEmail(req.body.email);
	if (check == false) {
		errors.push('Email invalid')
		res.render('auth/register',{
			errors : errors ,
			values : req.body
		})
		return;
	}
	next()
}