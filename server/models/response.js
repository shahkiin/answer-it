const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    rate: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'}
});

module.exports = mongoose.model('Response', ResponseSchema);