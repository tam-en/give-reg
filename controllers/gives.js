var express = require('express');
var router = express.Router();
var methodOverride = require('method-override');

// reference to middleware
var loggedIn = require('../middleware/loggedIn');
var isAdmin = require('../middleware/isAdmin');
var db = require('../models'); 




module.exports = router;