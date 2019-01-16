const shortid = require('shortid');
const md5 = require('md5');

const db = require('../db');

module.exports.index = (req,res) => {
	res.render('users/index',{
		users : db.get('users').value()
	});
};
module.exports.search = (req,res) => {
	var q = req.query.q;
	console.log(req.query);
	// console.log(db.get('users').value());
	var matchedUsers = db.get('users').value().filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1;
	});
	res.render('users/index',{
		users : matchedUsers,
		q : q
	})
};
module.exports.create = (req,res) => {
	res.render('users/create');
};
module.exports.view = (req,res) => {
	const id = req.params.id;
	console.log(req.params);
	// req.params là một object có key là string sau dấu ":", value là giá trị sau dấu "/" cuối cùng 
	const user = db.get('users')
	.find({ id : id })
	.value();
  	console.log(user);
  	res.render('users/view',{
  		user: user
  	});
};
module.exports.postCreate = (req,res) => {
	req.body.id = shortid.generate();
	// console.log(req.body);
	req.body.password = md5(req.body.password);
	db.get('users')
	.push( req.body )
	.write();
	res.redirect('/users');
};