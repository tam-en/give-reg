var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig')
var urlToCall;


// routes
router.get('charity-search', function(req, res){
	res.render('charities/charity-search');
});
//app.post('/charity-search', function(req, res){

router.post('/charity-search', function(req, res){
	console.log(req.body);
	console.log("req.body.userquery=", req.body.userquery);
	var userquery = encodeURI(req.body.userquery).toLowerCase();
	console.log("userquery = ", userquery);
	urlToCall = process.env.CHARITY_NAVIGATOR_URL+"&search="+userquery;
	//res.send(urlToCall);
	res.render('charities/charity-search');		
});

router.get('/:name', function(req, res){
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