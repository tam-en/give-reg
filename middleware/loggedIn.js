module.exports = function(req, res, next) {
	if(req.user) {
		next();
	} 
	else { // else they're not logged in
		req.flash('error', 'Please log in to see this page.');
		res.redirect('/auth/login');
	}
}