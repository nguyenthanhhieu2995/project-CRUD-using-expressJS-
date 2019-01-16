const db = require('../db');

module.exports.requireAuth = (req, res, next) => {
	var id = req.cookies.accountId;
	var account = db.get('account').find({ id : id}).value();
	if ( !account ) {
		res.redirect('/auth/login');
		return;
	};
	next();
}