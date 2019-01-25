const fs = require('fs');
const validator = require('validator');

const db = require('../db');

module.exports.postCreate = (req,res,next) => {
	var errors = [];
	if (validator.isEmpty(req.body.name)) {
		errors.push('Name is required');
	} 
	if (validator.isEmpty(req.body.phone)) {
		errors.push('Phone number is required')
	}
	else if (!validator.isMobilePhone(req.body.phone)) {
		errors.push('Phone number wrong')
	}
	if (!req.file) {
		errors.push('Images is required')
	}
	else if ( req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/gif') {
		errors.push('Only images is allow')
		fs.unlink('./public/uploads/' + req.file.filename, (err) => {
			if (err) throw err;
			console.log('successfully deleted');
		});
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
module.exports.postEdit = (req,res,next) => {
	var errors = [];
	console.log(req.file);
	var id = req.params.id;
	if (validator.isEmpty(req.body.name)) {
		errors.push('Name is required');
	} 
	if (validator.isEmpty(req.body.phone)) {
		errors.push('Phone number is required')
	}
	else if (!validator.isMobilePhone(req.body.phone)) {
		errors.push('Phone number wrong')
	}
	if (!req.file) {
		errors.push('Images is required')
	}
	else if ( req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/gif') {
		errors.push('Only images is allow');
		fs.unlink('./public/uploads/' + req.file.filename, (err) => {
			if (err) throw err;
			console.log('successfully deleted');
		});
	}
	if (errors.length > 0) {
		req.body.id = id;
		res.render('users/edit',{
			errors : errors,
			values : req.body
		});
		return;
	}
	next();
}