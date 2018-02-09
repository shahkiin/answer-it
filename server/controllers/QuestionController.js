var Question = require('../models/question');
var User = require('../models/user');
var Theme = require('../models/theme');
var Scale = require('../models/scale');
var Response = require('../models/response');

module.exports = {

	create: function(params, callback) {

		let data = {

			name: params.name,
			description: params.description,
			user: null,
			theme: null,
			scale: null
		};

		User.findById(params.jwtId, (err, user) => {

			if (err) {

				callback(err, null);
				return;
			}

			data.user = user._id;

			Theme.findOne({ name: params.theme }, (err, theme) => {
				
				if (err) {

					callback(err, null);
					return;
				}

				data.theme = theme._id;

				Scale.findOne({ name: params.scale }, (err, scale) => {

					if (err) {

						callback(err, null);
						return;
					}
	
					data.scale = scale._id;

					Question.create(data, function(err, question) {

						if (err) {
			
							callback(err, null);
							return;
						}
			
						callback(null, question);
					});
				});
			});
		});
	},

	delete: function(id, callback) {

		Question.findByIdAndRemove(id, function(err) {

			if (err) {

				callback(err, null);
				return;
			}

			callback(null, null);
		});
	},

	find: function(params, callback) {

		let arrays = {
			questions: [],
			themes: [],
			scales: []
		};

		Question.find({}, function(err, questions) {

			if (err) {

				callback(err, null);
				return;
			}

			arrays.questions = questions;

			Theme.find({}, (err, themes) => {
						
				if (err) {
	
					callback(err, null);
					return;
				}
	
				arrays.themes = themes;

				Scale.find({}, (err, scales) => {
							
					if (err) {
		
						callback(err, null);
						return;
					}
		
					arrays.scales = scales;

					Response.find({}, (err, responses) => {

						if (err) {
		
							callback(err, null);
							return;
						}

						User.findById(params.jwtId, (err, user) => {

							let converted = arrays.questions.map((question, i) => {

								return {

									name: question.name,
									description: question.description,
									_id: question._id,
									user: question.user,
									theme: arrays.themes.find(theme => theme._id.toString() === question.theme.toString()),
									scale: arrays.scales.find(scale => scale._id.toString() === question.scale.toString())
								}
							});

							let questionList = {
			
								my: converted.filter(question => question.user.toString() === user._id.toString()).map(question => {

									let newQuestion = question;

									newQuestion.responses = responses.filter(response => response.question.toString() === question._id.toString() && response.user.toString() !== user._id.toString());

									return newQuestion;
								}),
								other: converted.filter(question => question.user.toString() !== user._id.toString()).map(question => {

									let newQuestion = question;

									newQuestion.response = responses.find(response => response.question.toString() === question._id.toString() && response.user.toString() === user._id.toString());

									return newQuestion;
								})
							};
			
							callback(null, questionList);
						});	
					});
				});	
			});	
		});
	},

	findById: function(id, callback) {

		Question.findById(id, function(err, question) {

			if (err) {

				callback(err, null);
				return;
			}

			Theme.findById(question.theme, (err, theme) => {
						
				if (err) {

					callback(err, null);
					return;
				}

				Scale.findById(question.scale, (err, scale) => {
					
					if (err) {

						callback(err, null);
						return;
					}
	
					callback(null, {

						name: question.name,
						description: question.description,
						scale: scale.name,
						theme: theme.name,
						id: question._id
					});
				});
			});	
		});
	},

	prepare: function(params, callback) {

		let data = {

			themes: null,
			scales: null
		};

		Theme.find({}, (err, themes) => {
			
			if (err) {

				callback(err, null);
				return;
			}

			data.themes = themes;

			Scale.find({}, (err, scales) => {

				if (err) {

					callback(err, null);
					return;
				}

				data.scales = scales;

				callback(null, data);
			});
		});
	},

	update: function(id, params, callback) {

		Question.findByIdAndUpdate(id, params, { new: true }, function(err, question) {

			if (err) {

				callback(err, null);
				return;
			}

			callback(null, question);
		});
	}
};