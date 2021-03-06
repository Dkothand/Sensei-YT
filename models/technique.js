const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const techniqueSchema = new Schema({
    title: String,
    notes: [{type: String}],
    videoId: String
});

const Technique = mongoose.model('Technique', techniqueSchema);

module.exports = Technique;