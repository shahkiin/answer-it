var Response = require('../models/response');

module.exports = {

	create: function(params, callback) {

		Response.create({
         
            rate: params.rate,
            user: params.jwtId,
            question: params.questionId

        }, function(err, response) {

            if (err) {

                callback(err, null);
                return;
            }

            callback(null, response);
        });
	},

	find: function(params, callback) {

		Response.find({}, (err, responses) => {
						
            if (err) {

                callback(err, null);
                return;
            }

            callback(null, responses);
        });
	},

    findById: function(id, callback) {

		Response.findById(id, function(err, response) {

			if (err) {

				callback(err, null);
				return;
			}

			callback(null, response);
		});
	}
};