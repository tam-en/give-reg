var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig')


// Event setup routes
router.get('/eventsetup', function(req, res){
	console.log("req.body at router.get/eventsetup=", req.body);
	res.render('events/eventsetup');
});

router.post('/eventsetup', function(req, res){
	db.event.create({
		userId: req.body.id,
		name: req.body.name,
		date: req.body.date,
		desc: req.body.desc
	});
	res.render('events/asksetup');
});

// Ask setup routes
router.get('/asksetup', function(req, res){
	console.log("req.body at router.get/asksetup=", req.body);


	res.render('events/asksetup')
});

router.post('/asksetup', function(req, res){
	//var charity =JSON.parse(Object.values(req.body));
	console.log("req.body at router.post/asksetup=", req.body);


	console.log("here we go at asksetup=", req.body)
	res.render('events/asksetup');
});

// Ask display routes
router.get('/askdisplay', function(req, res){
	console.log("req.body at router.get/askdisplay=", req.body);

	res.render('events/askdisplay')
});

router.post('/askdisplay', function(req, res){
	console.log("req.body at router.post/askdisplay=", req.body);

	var charity =JSON.parse(Object.values(req.body));
	// db.ask.findOrCreate({
	// 	where: {
	// 		charityEIN: charity.ein,
	// 		}
	// 	})
	// 	.spread(function(ask, wasCreated){
	// 		res.redirect('/events/eventsetup');
	// 	})
	// 	.catch(function(err){
	// 		console.log('error', err);
	// 		res.render('error');
	// 	});
	res.render('events/askdisplay', { charity });
	//res.send(charity);
});




router.get('/eventsearch', function(req, res) {
	console.log("req.body at router.get/eventsearch=", req.body);
	res.render('events/eventsearch');
});


module.exports = router;