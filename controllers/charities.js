var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var passport = require('../config/passportConfig')
var urlToCall;


// Charity-search routes
router.get('/charity-search', function(req, res){
	res.render('charities/charity-search');
});

router.post('/charity-search', function(req, res){
	console.log('router.post(/charity-search) got called');
	res.render('charities/charity-search');	
});

// Charity-results routes
router.get('/charity-results', function(req, res){
	res.render('charities/charity-results');
});

router.post('/charity-results', function(req, res){
	console.log('got to router.post for /charity-results')
	console.log(req.body);
	console.log("req.body.charityName=", req.body.charityName);
	var inputName = encodeURI(req.body.charityName).toLowerCase();
	console.log("inputName = ", inputName);
	//urlToCall = process.env.CHARITY_NAVIGATOR_URL+"&search="+inputName;
	urlToCall = process.env.CHARITY_NAVIGATOR_URL+"&search="+inputName+"&searchType=NAME_ONLY&sort=RELEVANCE";
	//res.send(urlToCall);
	if(req.body.charityName){
    request(urlToCall, function(error, response, body){
    	console.log(urlToCall);
      if(error || response.statusCode != 200){
        res.render('error');
      }
      else {
        var foundCharities = JSON.parse(body);
        res.render('charities/charity-results', { foundCharities: foundCharities });
      }
    });
  }
  else {
    res.render('error');
  }
});

// EIN routes (search results for a specific organization based on EIN, its federal tax ID number)
router.get('/ein', function(req, res){
	res.render('charities/ein');
});

router.post('/ein', function(req, res){
	console.log('got to router.post for /ein')
	console.log(req.body);
	console.log("req.body.ein=", req.body.ein);
	var inputName = encodeURI(req.body.ein);
	console.log("inputName = ", inputName);
	urlToCall = "https://api.data.charitynavigator.org/v2/Organizations/"+inputName+process.env.CHARITY_NAVIGATOR_KEY;
	//res.send(urlToCall);
	if(req.body.ein){
    request(urlToCall, function(error, response, body){
    	console.log(urlToCall);
      if(error || response.statusCode != 200){
        res.render('error');
      }
      else {
        var foundCharity = JSON.parse(body);
        //res.send(urlToCall);
        res.render('charities/ein', {foundCharity});
      }
    });
  }
  else {
    res.render('error');
  }
});

// router.get('/', function(req, res){
// 	console.log('router.get(/name) got called');
//   if(req.params && req.params.name){
//     request(urlToCall, function(error, response, body){
//       if(error || response.statusCode != 200){
//         res.render('/partials/error');
//       }
//       else {
//         var charitydata = JSON.parse(body);
//         res.render('show', { charitydata: charitydata });
//       }
//     });
//   }
//   else {
//     res.render('/partials/error');
//   }
// });



module.exports = router;