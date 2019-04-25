const express = require('express');
const techniques = express.Router();
const Technique = require('../models/technique.js');


// INDEX
techniques.get('/', (req, res) => {
    res.render('index.ejs');
})

// NEW
techniques.get('/new', (req, res) => {
    res.render('new.ejs');
});

// SHOW
// CREATE
techniques.post('/', (req, res) => {
    // console.log(req.body)
    // res.send(req.body);
    Technique.create(req.body, (err, createdTechnique) => {
        if (err) {
            console.log(err)
        }
        console.log(createdTechnique)
        res.redirect('/techniques')
    });
});
// EDIT
// UPDATE
// DELETE
module.exports = techniques;