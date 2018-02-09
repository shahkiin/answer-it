const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema({
    name: String,
    color: String,
    backgroundColor: String
});

module.exports = mongoose.model('Theme', ThemeSchema);