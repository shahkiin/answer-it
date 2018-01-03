var Survey = require('../models/Survey');

var mongoose = require('mongoose');

var dbUrl = 'mongodb://localhost:27017/answer-it';
mongoose.connect(dbUrl, function(err, res) {

	if (err) {

		console.log('DB CONNECTION FAILED: ' + err);
	} else {

		console.log('DB CONNECTION SUCCESS: ' + dbUrl);
	}
});

var surveys = [

	new Survey({

		name: 'Ankieta satysfakcji',
		description: 'Ankieta w celu badania poziomu satysfakcji klienta.'
	}),
	new Survey({

		name: 'Test',
		description: 'Wykonaj testy wiedzy aby dowiedzieć się jaką wiedzę posiadają Twoi respondenci.'
	}),
	new Survey({

		name: 'Quiz',
		description: 'A może sprawdzić kto na co zasługuje? Zrób quiz a następnie niech wyłoni on zwycięzców!'
	}),
	new Survey({

		name: 'Ankieta anonimowa',
		description: 'Nie wszyscy lubią podawać swoje dane. W ten sposób dowiesz się więcej od respondentów!'
	})
];

var done = 0;

for (var i = 0; i < surveys.length; i++) {

	surveys[i].save(function(err, result) {

		done++;

		if (done === surveys.length) {

			exit();
		}
	});
}

function exit() {

	mongoose.disconnect();
}