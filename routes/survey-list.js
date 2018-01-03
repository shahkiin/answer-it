var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	
	res.render('pages/survey-list', { title: 'Survey list' });
});

module.exports = router;
