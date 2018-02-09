const express = require('express');
const jwt = require('jsonwebtoken');
const router = new express.Router();
const controllers = require('../controllers');

router.get('/:resource', (req, res, next) => {

    let resource = req.params.resource;
    let controller = controllers[ resource ];
    
    if (!controller) {

		res.status(200).json({

			confirmation: 'fail',
			message: 'Invalid Resource Request: ' + resource
		});

		return;
    }
    
    let token = req.headers.authorization.split(' ')[1];

    if (token) {
        const decoded = jwt.decode(token);
        let data = req.query;
        data.jwtId = decoded.sub;

        controller.find(data, (err, results) => {

            if (err) {

                res.status(200).json({
    
                    confirmation: 'fail',
                    message: err
                });
    
                return;
            }
    
            res.status(200).json({
    
                confirmation: 'success',
                results: results
            });
        });
    } else {
        res.status(200).json({
            confirmation: 'fail',
            message: "Invalid authorization."
        });
    }
});

router.get('/prepare/:resource', function(req, res, next) {

	let resource = req.params.resource;
	let controller = controllers[ resource ];

	if (!controller) {

		res.status(200).json({

			confirmation: 'fail',
			message: 'Invalid Resource Request: ' + resource
		});

		return;
    }
    
    let token = req.headers.authorization.split(' ')[1];

    if (token) {

        const decoded = jwt.decode(token);
        let data = req.query;
        data.jwtId = decoded.sub;

        controller.prepare(data, function(err, result) {

            if (err) {

                res.status(200).json({

                    confirmation: 'fail',
                    message: 'Not Found'
                });

                return;
            }

            res.status(200).json({

                confirmation: 'success',
                result: result
            });
        });
    } else {
        res.status(200).json({
            confirmation: 'fail',
            message: "Invalid authorization."
        });
    }
});

router.post('/delete/:resource/:id', function(req, res, next) {
    
    let resource = req.params.resource;
    let id = req.params.id;
    let controller = controllers[ resource ];

    if (!controller) {

        res.status(200).json({

            confirmation: 'fail',
            message: 'Invalid Resource Request: ' + resource
        });

        return;
    }
    
    let token = req.headers.authorization.split(' ')[1];

    if (token) {

        controller.delete(id, function(err, response) {

            if (err) {

                res.status(200).json({

                    confirmation: 'fail',
                    message: 'Not Found'
                });

                return;
            }

            res.status(200).json({

                confirmation: 'success',
                result: null
            });
        });
    } else {
        res.status(200).json({
            confirmation: 'fail',
            message: "Invalid authorization."
        });
    }
});

router.get('/:resource/:id', function(req, res, next) {
    
    let resource = req.params.resource;
    let id = req.params.id;
    let controller = controllers[ resource ];

    if (!controller) {

        res.status(200).json({

            confirmation: 'fail',
            message: 'Invalid Resource Request: ' + resource
        });

        return;
    }
    
    let token = req.headers.authorization.split(' ')[1];

    if (token) {

        controller.findById(id, function(err, result) {

            if (err) {

                res.status(200).json({

                    confirmation: 'fail',
                    message: 'Not Found'
                });

                return;
            }

            res.status(200).json({

                confirmation: 'success',
                result: result
            });
        });
    } else {
        res.status(200).json({
            confirmation: 'fail',
            message: "Invalid authorization."
        });
    }
});

router.post('/:resource', (req, res, next) => {

    let resource = req.params.resource;
    let controller = controllers[ resource ];
    
    if (!controller) {

		res.status(200).json({

			confirmation: 'fail',
			message: 'Invalid Resource Request: ' + resource
		});

		return;
    }
    
    let token = req.headers.authorization.split(' ')[1];

    if (token) {
        const decoded = jwt.decode(token);
        let data = req.body;
        data.jwtId = decoded.sub;

        controller.create(data, (err, results) => {

            if (err) {

                res.status(200).json({
    
                    confirmation: 'fail',
                    message: err
                });
    
                return;
            }
    
            res.status(200).json({
    
                confirmation: 'success',
                // results: results
                results: 'Action successfully.'
            });
        });
    } else {
        res.status(200).json({
            confirmation: 'fail',
            message: "Invalid authorization."
        });
    }
});

router.post('/update/:resource', function(req, res, next) {
   
    let resource = req.params.resource;
    let controller = controllers[ resource ];

    if (!controller) {

        res.status(200).json({

            confirmation: 'fail',
            message: 'Invalid Resource Request: ' + resource
        });

        return;
    }
    
    let token = req.headers.authorization.split(' ')[1];

    if (token) {

        const decoded = jwt.decode(token);
        let data = req.body;
        data.jwtId = decoded.sub;

        controller.update(data.id, data, function(err, result) {

            if (err) {

                res.status(200).json({

                    confirmation: 'fail',
                    message: 'Not Found'
                });

                return;
            }

            res.status(200).json({

                confirmation: 'success',
                result: result
            });
        });
    } else {
        res.status(200).json({
            confirmation: 'fail',
            message: "Invalid authorization."
        });
    }
});

module.exports = router;