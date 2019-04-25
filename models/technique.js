const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const techniqueSchema = new Schema({
    title: String,
    notes: String,
    link: String
});

const Technique = mongoose.model('Technique', techniqueSchema);