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

	var foundCharity =JSON.parse(Object.values(req.body));
	db.charity.findOrCreate({
		where: {
			ein: foundCharity.ein,
			},
			defaults: {
				ein: foundCharity.ein,
				charityName: foundCharity.charityName,
				category: foundCharity.category.categoryName,
				cause: foundCharity.cause.causeName,
				tagLine: foundCharity.tagLine,
				mission: foundCharity.mission,
				websiteURL: foundCharity.websiteURL,
				charityNavigatorURL: foundCharity.charityNavigatorURL,
				irsSubsection: foundCharity.irsClassification.subsection,
				streetAddress1: foundCharity.mailingAddress.streetAddress1,
				streetAddress2: foundCharity.mailingAddress.streetAddress2,
				city: foundCharity.mailingAddress.city,
				state: foundCharity.mailingAddress.stateOrProvince,
				postalCode: foundCharity.mailingAddress.postalCode,
				country: foundCharity.mailingAddress.country,
				rating: foundCharity.currentRating.score,
				starsLarge: foundCharity.currentRating.ratingImage.large,
				deductibility: foundCharity.irsClassification.deductibility,
				dStreetAddress1: foundCharity.donationAddress.streetAddress1,
				dStreetAddress2: foundCharity.donationAddress.streetAddress2,
				dCity: foundCharity.donationAddress.city,
				dState: foundCharity.donationAddress.stateOrProvince,
				dPostalCode: foundCharity.donationAddress.postalCode,
				dCountry: foundCharity.donationAddress.country
			}
		})
		.spread(function(ask, wasCreated){
			res.redirect('/events/eventsetup');
		})
		.catch(function(err){
			console.log('error', err);
			res.render('error');
		});
	res.render('events/askdisplay', { foundCharity });
	//res.send(foundCharity);
});

// routes for event page
router.get('/event', function(req, res){
	res.render('events/event');
})

router.get('/event/:id', function(req, res){
	db.event.findByPk(
		req.params.id
	).then(function(event) {
		res.render('events/event', { event: event } );
	});
})




router.get('/eventsearch', function(req, res) {
	console.log("req.body at router.get/eventsearch=", req.body);
	res.render('events/eventsearch');
});


module.exports = router;