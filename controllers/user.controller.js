const shortid = require('shortid');

const db = require('../db');

module.exports.index = (req,res) => {
	var page = (req.query.page) || 1;
	var perPage = 8;
	var start = (page-1) * perPage;
	var end = page * perPage;  
	res.render('users/index',{
		users : db.get('users').value().slice(start,end)
	});
};
module.exports.search = (req,res) => {
	var page = (req.query.page) || 1;
	var perPage = 8;
	var start = (page-1) * perPage;
	var end = page * perPage;
	var q = req.query.q;
	// console.log(db.get('users').value());
	var matchedUsers = db.get('users').value().filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1;
	});
	res.render('users/index',{
		users : matchedUsers.slice(start,end),
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
	db.get('users')
	.push( req.body )
	.write();
	res.redirect('/users');
};
