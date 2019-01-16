const md5 = require('md5');
const shortid = require('shortid');

const db = require('../db');

module.exports.register = (req,res) => {
	res.render('auth/register');
}
module.exports.postRegister = (req,res) => {
	email = req.body.email;
	req.body.password = md5(req.body.password);
	req.body.id = shortid.generate();
	db.get('account')
	.push( req.body )
	.write();
	res.redirect('/auth/login');
}