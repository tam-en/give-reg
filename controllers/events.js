var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig')

// router.get('/login', function(req, res) {
// 	res.render('auth/login');
// });

router.get('/eventsetup', function(req, res){
	res.render('events/eventsetup');
});

router.post('/eventsetup', function(req, res){
	res.render('events/eventsetup', { previousData: req.body });
});

router.get('/eventsearch', function(req, res) {
	res.render('events/eventsearch');
});


module.exports = router;