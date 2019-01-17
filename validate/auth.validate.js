const db = require('../db');

module.exports.requireAuth = (req, res, next) => {
	var id = req.signedCookies.accountId;
	console.log(req.signedCookies);
	var account = db.get('account').find({ id : id}).value();
	if ( !account ) {
		res.redirect('/auth/login');
		return;
	};

	res.locals.account = account;
// res.locals là một obj chứa các biến cục bộ trong một vòng đời req, res dùng giữa các middleware
	next();
}