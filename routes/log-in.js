var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var jwt = require('jsonwebtoken');

var headOptions = {

	title: 'answerIt - simple service to create and share surveys.'
};

router.get('/', function(req, res, next) {

	if (res.locals.user) {

		res.redirect('/');
	}

	res.render('layout', headOptions);
});

passport.use(new LocalStrategy(function(username, password, done) {

	User.getUserByUsername(username, function(err, user) {

		if (err) {

			throw err;
		}

		if (!user) {

			return done(null, false, { message: 'Unkown User.' });
		}

		User.comparePassword(password, user.password, function(err, isMatch) {

			if (err) {

				throw err;
			}

			if (isMatch) {

				console.log(user);

				// const payload = {
				// 	sub: user._id
				// };
				// const token = jwt.sign(payload, config.jwtSecret);
				// const data = {
				// 	name: user.username
				// };

				// console.log(payload, token, data);

				// return done(null, token, data);

				return done(null, user);
			} else {
				return done(null, false, { message: 'Invalid password.' });
			}
		});
	});
}));

// passport.use(new LocalStrategy(
// 	function(username, password, done) {

// 		console.log(111, username, password, done);

// 	  User.findOne({ username: username }, function(err, user) {

// 		console.log(222, err, user);

// 		if (err) { return done(err); }
// 		if (!user) {
// 		  return done(null, false, { message: 'Incorrect username.' });
// 		}

// 		console.log(300);

// 		// if (!user.validPassword(password)) {
// 		//   return done(null, false, { message: 'Incorrect password.' });
// 		// }

// 		//console.log(333, user.validPassword(password));
// 		console.log(444);
// 		return done(null, user);
// 	  });
// 	}
//   ));

passport.serializeUser(function(user, done) {
console.log('serialize user', user, done);
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
console.log('1 deserialize user', id, done);
	User.getUserById(id, function(err, user) {
console.log('2 get user by id', err, user);

		done(err, user);
	});
});

router.post('/', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/logIn', failureFlash: true}), function(req, res, next) {

	console.log('login succes, its time to back to client');

	res.redirect('/');
});

module.exports = router;
