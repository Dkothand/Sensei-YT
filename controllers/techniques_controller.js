const express = require('express');
const techniques = express.Router();

techniques.get('/', (req, res) => {
    res.render('index.ejs');
})

module.exports = techniques;