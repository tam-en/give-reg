// Require passport module and any strategies you wish to use
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// a reference to our models
var db = require('../models');

// provide serialize/deserialize functions so we can store user in session
// both "passport.serializeUser" and "passport.deserializeUser" are basically boilerplate from the npm passport documentation

passport.serializeUser(function(user, callback) { //callback: first arg will be error, if there is one, second arg is user.id
	//callback(errorMessage, userData)
	callback(null, user.id)
});
 
passport.deserializeUser(function(id, callback) {
  db.user.findById(id)
  .then(function(user){
  	callback(null, user);
  })
  .catch(function(err){
  	callback(err, null);
  })
});

// Do the actual logging in (authentication)
passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, callback){
	db.user.findOne({
		where: { email: email }
	})
	.then(function(foundUser){
		if(!foundUser || !foundUser.validPassword(password)){
			// bad
			callback(null, null);
		} else {
			//good
			callback(null, foundUser); // null = no error message here
		}
	})
	.catch(function(err){
		callback(err, null);
	})
}));

// Make sure I can include this module
module.exports = passport;