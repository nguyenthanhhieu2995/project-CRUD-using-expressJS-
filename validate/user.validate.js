var validator = require('validator');

module.exports.postCreate = (req,res,next) => {
	var errors = [];
	console.log(req.body.name);
	console.log(req.body.phone);
	if (validator.isEmpty(req.body.name)) {
		errors.push('Name is required');
	} 
	if (validator.isEmpty(req.body.phone)) {
		errors.push('Phone number is required')
	}
	else if (!validator.isMobilePhone(req.body.phone,['vi-VN'])) {
		errors.push('Phone number wrong')
	}
	if (errors.length > 0) {
		res.render('users/create',{
			errors : errors,
			values : req.body
		})
		return;
	}
	next();
}