var mongoose = require('mongoose');

var SurveySchema = new mongoose.Schema({

	name: { type: String, default: '', required: true },
	description: { type: String, default: '' },
	created: { type: Date, default: Date.now },
	questions: { type: Array, default: [] },
	author: { type: Number, default: 0, required: true }
});

module.exports = mongoose.model('SurveySchema', SurveySchema);