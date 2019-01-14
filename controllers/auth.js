var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig')

router.get('/login', function(req, res) {
	res.render('auth/login');
});

router.get('/signup', function(req, res) {
	res.render('auth/signup', { previousData: null });
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	successFlash: 'Login successful.',
	failureRedirect: '/auth/login',
	failureFlash: 'Sorry. Invalid Credentials.'
}));

router.post('/signup', function(req, res, next) {
	if(req.body.password != req.body.password_verify) { //flash
		req.flash('error', 'whoops! passwords do not match!');
		//req = deletePassword(req, res);
		//console.log("inside if statement, req,body=", req.body);
		res.render('auth/signup', { previousData: req.body, alerts: req.flash() }); // note that the redirect route needs to be absolute
	}
	else {
		//console.log("YO! got to else");
		db.user.findOrCreate({
			where: { email: req.body.email },
			defaults: req.body
		})	
		.spread(function(user, wasCreated){
			//console.log('got to the spread promise')
			if(wasCreated){
				passport.authenticate('local', {
					successRedirect: '/profile',
					successFlash: 'Login successful!',
					failureRedirect: '/auth/login',
					failureFlash: 'Sorry. Invalid credentials.'
				})(req, res, next);
				//console.log('YOOOOOOOOOO was created');
				req.flash('success', 'Thank you for signing up!');
				//res.redirect('/profile');
			}
			else {
				//console.log('email was found ooops');
				req.flash('error', 'email address already in use');
				//req = deletePassword(req, res);
				res.render('auth/signup', { previousData: req.body, alerts: req.flash() });
			}
		})
		.catch(function(err){
			//console.log('there was an error')
			if(err && err.errors) {
				//console.log('2 there was an error')
				err.errors.forEach(function(e){
					console.log('Error Type', e.type);
					if(e.type == 'Validation error') {
						req.flash('error', 'Validation error: ' + e.message);
					}
					else {
						console.log('Error (not validation)', e);
					}
				})
			} 
			//console.log('there was an error???3', err)
			//req = deletePassword(req, res);
			res.render('auth/signup', { previousData: req.body, alerts: req.flash() });
		});
	}
});

router.get('/logout', function(req, res){
	req.logout(); //logs me out of session
	req.flash('success', 'Logout successful. Thanks for stopping by!');
	res.redirect('/');
});

// function deletePassword(req, res) {
// 	res.locals.alerts = req.flash();
// 	delete req.body.password;
// 	delete req.body.password_verify;
// 	return req;
// };

module.exports = router;