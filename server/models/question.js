const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    name: {type: String, default: '', required: true},
    description: {type: String, default: ''},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Theme'},
    theme: {type: mongoose.Schema.Types.ObjectId, ref: 'Theme'},
    scale: {type: mongoose.Schema.Types.ObjectId, ref: 'Scale'}
});

module.exports = mongoose.model('Question', QuestionSchema);