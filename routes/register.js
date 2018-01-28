var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var bcrypt = require('bcryptjs');
var User = require('../models/User');

router.use( expressValidator() );

var headOptions = {

	title: 'answerIt - simple service to create and share surveys.'
};

router.get('/', function(req, res, next) {

	res.render('layout', headOption);
});

router.post('/', function (req, res, next) {

    const username = req.body.username;
    const password = req.body.password;
    const passwordReapeat = req.body.passwordReapeat;
    const confirmation = req.body.confirmation;

	req.checkBody('username', 'Username is required.').notEmpty();
    req.checkBody('password', 'Password is required.').notEmpty();
    req.checkBody('passwordRepeat', 'Passwords do not match.').equals(req.body.password);
    req.checkBody('confirmation', 'Confirmation is required.').notEmpty();

	let errors = req.validationErrors();

    if (errors) {

        res.json({

            confirmation: 'fail',
            message: errors
        });
    } else {

		let newUser = new User({

			username: username,
			password: password,
			confirmation: confirmation
		});

		User.createUser(newUser, function(err, user) {

			if (err) {

				throw err;
			}

			console.log('redirect?');

			// res.redirect('/logIn');

			res.json({

				confirmation: 'success',
				redirect: '/logIn'
			});
		});
    }
});

module.exports = router;
