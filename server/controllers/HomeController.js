var User = require('../models/user');

module.exports = {

	create: function(params, callback) {

		callback(null, null);
	},

	delete: function(id, callback) {

		callback(null, null);
	},

	find: function(params, callback) {

		this.findById(params.jwtId, callback);
	},

    findById: function(id, callback) {

		User.findById(id, function(err, user) {

			if (err) {

				callback(err, null);
				return;
			}

			callback(null, user.name);
		});
	},

	update: function(id, params, callback) {

		callback(null, null);
	}
};