const mongoose = require('mongoose');

module.exports.connect = (uri) => {
    mongoose.connect(uri);
    // plug in the promise library:
    mongoose.Promise = global.Promise;


    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`);
        process.exit(1);
    });

    // load models
    require('./user');
    require('./scale');
    require('./theme');
    require('./question');
    require('./response');
};