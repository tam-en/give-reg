module.exports = function(req, res, next) {
	if(req.user && req.user.admin) {
		next();
	} 
	else { // else they're not logged in
		req.flash('error', 'Only admins may access the admins page.');
		res.redirect('/profile');
	}
}