var express = require('express');
var router = express.Router();
var methodOverride = require('method-override');



// reference to middleware
var loggedIn = require('../middleware/loggedIn');
var isAdmin = require('../middleware/isAdmin');
var db = require('../models'); 



router.get('/', loggedIn, function(req, res){
	console.log("got to profile.js router.get for /");
	console.log("and");
	db.event.find({
		where: { userId: req.body.id }
	}).then(function(foundEvents){
		res.render('profile', {event: foundEvents});
		console.log(foundEvents);
	}).catch(function(err){
		console.log('error', err);
		res.send('check yer logs');
	})
});

router.get('/admins', isAdmin, function(req, res){
	res.render('admins');
});

router.delete('/:id', function(req, res){
	db.user.destroy({
		where: { id: req.params.id }
	}).then(function(user) {
		req.flash('success', 'Account deleted! Sign up again?');
		res.redirect('/auth/signup');
	}).catch(function(error) {
		console.log("error!", error);
		res.send('check your logs');
	});
});


module.exports = router;
