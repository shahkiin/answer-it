var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({

	username: { type: String, required: true },
	password: { type: String, required: true },
	confirmation: { type: Boolean, required: true }
});

var Usrer = module.exports = mongoose.model('users', UserSchema);

module.exports.createUser = function(newUser, callback) {

	bcrypt.genSalt(10, function(err, salt) {

		if (err) {

			throw err;
			return;
		}

		bcrypt.hash(newUser.password, salt, function(err, hash) {

			newUser.password = hash;
			newUser.save(callback);
		});
	});
}