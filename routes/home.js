var express = require('express');
var router = express.Router();

var headOptions = {

	title: 'answerIt - simple service to create and share surveys.'
};

router.get('/', function(req, res, next) {

	//res.render('pages/home', { title: 'answerIt - simple service to create and share surveys.' });
	res.render('layout', headOptions);
});

router.get('/surveyEditor', function(req, res, next) {

	//res.render('pages/home', { title: 'answerIt - simple service to create and share surveys.' });
	res.render('layout', headOptions);
});

router.get('/surveyList', function(req, res, next) {

	//res.render('pages/home', { title: 'answerIt - simple service to create and share surveys.' });
	res.render('layout', headOptions);
});

module.exports = router;
