const mongoose = require('mongoose');

const ScaleSchema = new mongoose.Schema({
    name: String,
    from: Number,
    to: Number
});

module.exports = mongoose.model('Scale', ScaleSchema);