var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/:resource', function(req, res, next) {

	let resource = req.params.resource;
	let controller = controllers[ resource ];

	if (!controller) {

		res.json({

			confirmation: 'fail',
			message: 'Invalid Resource Request: ' + resource
		});

		return;
	}

	controller.find(req.query, function(err, results) {

		if (err) {

			res.json({

				confirmation: 'fail',
				message: err
			});

			return;
		}

		res.json({

			confirmation: 'success',
			results: results
		});
	});
});

router.get('/:resource/:id', function(req, res, next) {

	let resource = req.params.resource;
	let id = req.params.id;
	let controller = controllers[ resource ];

	if (!controller) {

		res.json({

			confirmation: 'fail',
			message: 'Invalid Resource Request: ' + resource
		});

		return;
	}

	controller.findById(id, function(err, result) {

		if (err) {

			res.json({

				confirmation: 'fail',
				message: 'Not Found'
			});

			return;
		}

		res.json({

			confirmation: 'success',
			result: result
		});
	});
});

router.post('/:resource', function (req, res, next) {

	let resource = req.params.resource;
	let controller = controllers[ resource ];
	
	if (!controller) {

		res.json({

			confirmation: 'fail',
			message: 'Invalid Resource Request: ' + resource
		});

		return;
	}

	controller.create(req.body, function (err, result) {

		if (err) {

			res.json({

				confirmation: 'fail',
				message: err
			});

			return;
		}

		res.json({

			confirmation: 'success',
			result: result
		});
	});
});

module.exports = router;