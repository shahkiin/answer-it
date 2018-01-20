var express = require('express');
var router = express.Router();

router.get('*', function(req, res, next) {

	//res.render('pages/home', { title: 'answerIt - simple service to create and share surveys.' });
	res.render('layout', { title: 'answerIt - simple service to create and share surveys.' });
});

module.exports = router;
