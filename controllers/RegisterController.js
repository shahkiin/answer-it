var Survey = require('../models/Survey');

module.exports = {

	create: function(params, callback) {

		Survey.create(params, function(err, survey) {

			if (err) {

				callback(err, null);
				return;
			}

			callback(null, survey);
		});
	},

	delete: function(id, callback) {

		Survey.findByIdAndRemove(id, function(err) {

			if (err) {

				callback(err, null);
				return;
			}

			callback(null, null);
		});
	},

	find: function(params, callback) {

		Survey.find(params, function(err, surveys) {

			if (err) {

				callback(err, null);
				return;
			}

			callback(null, surveys);
		});
	},

	findById: function(id, callback) {

		Survey.findById(id, function(err, survey) {

			if (err) {

				callback(err, null);
				return;
			}

			callback(null, survey);
		});
	},

	update: function(id, params, callback) {

		Survey.findByIdAndUpdate(id, params, { new: true }, function(err, survey) {

			if (err) {

				callback(err, null);
				return;
			}

			callback(null, survey);
		});
	}
};