var Theme = require('../models/theme');
var mongoose = require('mongoose');
var config = require('../../config/index.json');

require('../models').connect(config.dbUri);

var themes = [

	new Theme({

		name: 'Jasny',
        color: '#000',
        backgroundColor: '#fff'
    }),
    new Theme({

		name: 'Ciemny',
        color: '#fff',
        backgroundColor: '#000'
    }),
    new Theme({

		name: 'Ciepły',
        color: '#ffc107',
        backgroundColor: '#ff5722'
    }),
    new Theme({

		name: 'Zimny',
        color: '#03a9f4',
        backgroundColor: '#3f51b5'
    })
];

var done = 0;

for (var i = 0; i < themes.length; i++) {

	themes[i].save(function(err, result) {

		done++;

		if (done === themes.length) {

			exit();
		}
	});
}

function exit() {

	mongoose.disconnect();
}