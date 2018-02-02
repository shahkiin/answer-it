var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var expressValidator = require('express-validator');
var bcrypt = require('bcryptjs');
var User = require('../models/User');

router.use( expressValidator() );

var headOptions = {

	title: 'answerIt - simple service to create and share surveys.'
};

router.get('/', function(req, res, next) {

	res.render('layout', headOptions);
});

module.exports = router;
