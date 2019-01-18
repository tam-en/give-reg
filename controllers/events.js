var express = require('express');
var router = express.Router();
var db = require('../models');
var methodOverride = require('method-override');
var passport = require('../config/passportConfig');


// Event setup routes
router.get('/event-setup', function(req, res){
	console.log("req.body at router.get/eventsetup=", req.body);
	res.render('events/event-setup');
});

router.post('/event-setup', function(req, res){
	db.event.create({
		userId: req.body.id,
		name: req.body.name,
		date: req.body.date,
		desc: req.body.desc
	});
	res.render('events/event-setup');
});

// Event-admin setup routes
router.get('/event-admin', function(req, res){
	console.log("req.body at router.get/asksetup=", req.body);
	res.render('events/event-admin')
});

router.post('/event-admin', function(req, res){
	//var charity =JSON.parse(Object.values(req.body));
	console.log("req.body at router.post/asksetup=", req.body);
	console.log("here we go at event-admin=", req.body);
	res.render('events/event-admin');
});

// routes for event page
router.get('/event', function(req, res){
	res.render('events/event');
});

router.get('/event/:id', function(req, res){
	db.event.findByPk(
		req.params.id
	).then(function(event) {
		res.render('events/event', { event: event } );
	});
});

router.put('/event/:id', function(req, res){
	console.log('made it to router.put route');
	console.log(req.body);
	console.log(req.params.id);
  	db.event.update({
		name: req.body.name,
		desc: req.body.desc,
		date: req.body.date
	}, {
		where: {
			id: req.params.id
		}
	}).then(function(event) {
		res.redirect('/profile');
	}).catch(function(error) {
		console.log('error!', error);
		res.send('check yer logs')
	})
});

router.get('/eventsearch', function(req, res) {
	console.log("req.body at router.get/eventsearch=", req.body);
	res.render('events/eventsearch');
});

router.get('event-list', function(req, res){
	db.event.findAll()
	.then(function(event){
		res.render('events/event-list', {event: event} );
	})
})

module.exports = router;