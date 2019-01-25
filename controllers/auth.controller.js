const md5 = require('md5');

const db = require('../db');

module.exports.login = (req,res) => {
	res.render('auth/login');
}
module.exports.postLogin = (req,res) => {
	var email = req.body.email;
	var password = req.body.password;
		hashPassword = md5(password);
	var account = db.get('account').find({ email : email}).value();
	if (!account || hashPassword !== account.password) {
		res.render('auth/login',{
			errors : ['Account or password is wrong!'],
			values : req.body
		});
		return;
	}
	res.cookie('accountId',account.id,{
		signed : true
	});
	res.redirect('/users');
}