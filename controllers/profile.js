var express = require('express');
var router = express.Router();
var db = require('../models');
var methodOverride = require('method-override');
var passport = require('../config/passportConfig');

// reference to middleware
var loggedIn = require('../middleware/loggedIn');
var isAdmin = require('../middleware/isAdmin');

router.get('/', loggedIn, function(req, res){
	//console.log("YAYYYYY!!!!! got to profile.js router.get for /");
	// console.log(loggedUser);
	db.event.findAll({
		where: { userId: req.user.dataValues.id }
	}).then(function(foundEvents){
		//console.log("OMG!!!!!", foundEvents);
		res.render('profile', { foundEvents });
	}).catch(function(err){
		//console.log('error', err);
		res.send('check yer logs');
	})
});

router.get('/profile-edit', function(req, res){
	res.render('/profile/profile-edit');
});

router.get('/profile-edit/:id', function(req, res){
	db.user.findByPk(
		req.params.id
	).then(function(user){
		res.render('profile/profile-edit', { user: user});
	});
});

router.put('/profile-edit/:id', function(req, res){
	db.user.update({
	  firstname: req.body.firstname,
	  lastname: req.body.lastname,
	  bio: req.body.bio
	}, {
		where: {
		id: req.params.id
		}
	}).then(function() {
	  res.redirect('/profile');
})
});


// router.get('/admins', isAdmin, function(req, res){
// 	res.render('admins');
// });

// router.delete('/:id', function(req, res){
// 	db.user.destroy({
// 		where: { id: req.params.id }
// 	}).then(function(user) {
// 		req.flash('success', 'Account deleted! Sign up again?');
// 		res.redirect('/auth/signup');
// 	}).catch(function(error) {
// 		console.log("error!", error);
// 		res.send('check your logs');
// 	});
// });

module.exports = router;
