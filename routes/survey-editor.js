var express = require('express');
var router = express.Router();

var headOptions = {

	title: 'answerIt - simple service to create and share surveys.'
};

router.get('/', function(req, res, next) {

	if (!res.locals.user) {

		res.redirect('/');
	}

	res.render('layout', headOptions);
});

module.exports = router;
