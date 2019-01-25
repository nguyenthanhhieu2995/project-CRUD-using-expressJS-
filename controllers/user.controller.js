const fs = require('fs');
const shortid = require('shortid');
const paginate = require('express-paginate'); 

const db = require('../db');

module.exports.index = (req,res) => {
	var page = (req.query.page) || 1;
	var perPage = 8;
	var start = (page-1) * perPage;
	var end = page * perPage; 
	var q = req.query.q;
	//console.log(typeof(q));
	if (q) {
		if (q.trim() == '' || q.trim() == null) {
			users = db.get('users').value();
		} else {
			users = db.get('users').value().filter(function(user) {
				return user.name.toLowerCase().indexOf(q.trim().toLowerCase()) !==-1;
			});
		}	
	} else {
		users = db.get('users').value();
	}
	var itemCount = users.length;
	var pageCount = Math.ceil(itemCount/perPage); 
	res.render('users/index',{
		users : users.slice(start,end),
		pages : paginate.getArrayPages(req)(3, pageCount, req.query.page),
		pageCount: pageCount,
		itemCount : itemCount,
		fullUrl : req.originalUrl,
		q : q
	});
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
module.exports.edit = (req,res) => {
	const id = req.params.id;
	const user = db.get('users')
	.find({ id : id})
	.value();
	res.render('users/edit',{
		values : user
	});
}
module.exports.postEdit = (req,res) => {
	const id = req.params.id;
	const userEdit = db.get('users').find({ id : id}).value();
	const oldImg = userEdit.avatar; // upload\\fjadjgadg
	if (oldImg) {
		const oldImgBinary = oldImg.split('\\').slice(1).join('\\');
		fs.unlink('./public/uploads/' + oldImgBinary, (err) => {
			if (err) throw err;
			console.log('successfully deleted');
		});
	}
	req.body.avatar = req.file.path.split('\\').slice(1).join('\\'); //new
	db.get('users')
	.find({ id : id }).assign({
		name : req.body.name,
		phone : req.body.phone,
		avatar : req.body.avatar 
	}).write();
	res.redirect('/users');
}
module.exports.delete = (req,res) => {
	const id = req.params.id;
	const userEdit = db.get('users').find({ id : id}).value();
	const oldImg = userEdit.avatar; // upload\\fjadjgadg
	if (oldImg) {
		const oldImgBinary = oldImg.split('\\').slice(1).join('\\');
		fs.unlink('./public/uploads/' + oldImgBinary, (err) => {
			if (err) throw err;
			console.log('successfully deleted');
		});
	}
	db.get('users')
	.remove({ id : id})
	.write();
	res.redirect('/users');
}
module.exports.postCreate = (req,res) => {
	req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split('\\').slice(1).join('\\');
	// console.log(req.body);
	db.get('users')
	.push( req.body )
	.write();
	res.redirect('/users');
};
