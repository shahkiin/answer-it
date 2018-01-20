var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

	res.render('layout', { title: 'Survey editor' });
});

module.exports = router;
