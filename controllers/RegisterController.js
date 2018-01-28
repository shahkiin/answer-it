var User = require('../models/User');
// var bcrypt = require('bcryptjs');
// https://github.com/scotch-io/easy-node-authentication/blob/local/app/models/user.js

// na razie nie używane !!!

module.exports = {

	create: function(params, callback) {

		console.log('controller', params);

		let newUser = new User({

			username: params.username,
			password: params.password,
			confirmation: params.confirmation
		});

		console.log('newuser', newUser);

		bcrypt.getSalt(10, function(err, salt) {
console.log('setdalt callback', err, salt);
			bcrypt.hash(newUser.password, salt, function(err, hash) {
console.log('hash callback', err, hash);
				if (err) {

					callback(err, null);
					return;
				}

				newUser.password = hash;
				console.log('going to save');
				newUser.save(function(err) {
					console.log('save callback', err);
					if (err) {

						callback(err);
						return;
					}

					callback(null);
				});

				// User.create(newUser, function(err, user) {

				// 	if (err) {
		
				// 		callback(err);
				// 		return;
				// 	}
		
				// 	callback(null);
				// });
			});
		});
	},

	delete: function(id, callback) {

		User.findByIdAndRemove(id, function(err) {

			if (err) {

				callback(err, null);
				return;
			}

			callback(null, null);
		});
	},

	find: function(params, callback) {

		User.find(params, function(err, surveys) {

			if (err) {

				callback(err, null);
				return;
			}

			callback(null, surveys);
		});
	},

	findById: function(id, callback) {

		User.findById(id, function(err, survey) {

			if (err) {

				callback(err, null);
				return;
			}

			callback(null, survey);
		});
	},

	update: function(id, params, callback) {

		User.findByIdAndUpdate(id, params, { new: true }, function(err, survey) {

			if (err) {

				callback(err, null);
				return;
			}

			callback(null, survey);
		});
	}
};