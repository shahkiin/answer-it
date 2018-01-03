var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

	res.render('pages/survey-editor', { title: 'Survey editor' });
});

module.exports = router;
