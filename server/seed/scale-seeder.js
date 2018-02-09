var Scale = require('../models/scale');
var mongoose = require('mongoose');
var config = require('../../config/index.json');

require('../models').connect(config.dbUri);

var scales = [

	new Scale({

		name: '0-5',
        from: 0,
        to: 5
    }),
    new Scale({

		name: '1-5',
        from: 1,
        to: 5
    }),
    new Scale({

		name: '0-10',
        from: 0,
        to: 10
    }),
    new Scale({

		name: '1-10',
        from: 1,
        to: 10
    })
];

var done = 0;

for (var i = 0; i < scales.length; i++) {

	scales[i].save(function(err, result) {

		done++;

		if (done === scales.length) {

			exit();
		}
	});
}

function exit() {

	mongoose.disconnect();
}