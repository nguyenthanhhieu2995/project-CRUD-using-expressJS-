module.exports.postCreate = (req,res,next) => {
	var errors = [];
	var regExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	
	if (!req.body.name) {
		errors.push('Name is required');
	} 
	if (!req.body.phone) {
		errors.push('Phone number is required')
	} 
	if (!req.body.phone.match(regExp)) {
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