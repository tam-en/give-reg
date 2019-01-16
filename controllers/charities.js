var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig')
var urlToCall;


// routes
router.get('/charity-search', function(req, res){
	res.render('charities/charity-search');
});

router.get('/charity-results', function(req, res){
	res.render('charities/charity-results');
});

router.post('/charity-results', function(req, res){
	console.log('got to router.post for /charity-results')
	res.redirect('/charities/charity-results');
});

router.post('/charity-search', function(req, res){
	console.log('router.post(/charity-search) got called');
	console.log(req.body);
	console.log("req.body.userquery=", req.body.userquery);
	var userquery = encodeURI(req.body.userquery).toLowerCase();
	console.log("userquery = ", userquery);
	urlToCall = process.env.CHARITY_NAVIGATOR_URL+"&search="+userquery;
	//res.send(urlToCall);
	res.render('charities/charity-search');	
});

router.get('/', function(req, res){
	console.log('router.get(/name) got called');
  if(req.params && req.params.name){
    request(urlToCall, function(error, response, body){
      if(error || response.statusCode != 200){
        res.render('/partials/error');
      }
      else {
        var charitydata = JSON.parse(body);
        res.render('show', { charitydata: charitydata });
      }
    });
  }
  else {
    res.render('/partials/error');
  }
});



module.exports = router;