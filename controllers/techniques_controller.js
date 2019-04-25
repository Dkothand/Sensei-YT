const express = require('express');
const techniques = express.Router();

techniques.get('/', (req, res) => {
    res.render('index.ejs');
})


techniques.get('/new', (req, res) => {
    res.render('new.ejs');
});

module.exports = techniques;