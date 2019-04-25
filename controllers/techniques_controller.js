const express = require('express');
const techniques = express.Router();
const Technique = require('../models/technique.js');


// INDEX
techniques.get('/', (req, res) => {
    Technique.find({}, (err, foundTechniques) => {
        if (err) {
            console.log(err)
        }
        res.render('index.ejs', {
            moves: foundTechniques
        });
    });
});

// NEW
techniques.get('/new', (req, res) => {
    res.render('new.ejs');
});

// SHOW
techniques.get('/:id', (req, res) => {
    Technique.findById(req.params.id, (err, foundTechnique) => {
        if (err) {
            console.log(err)
        }
        res.render('show.ejs', {
            move: foundTechnique
        })
    })
});

// CREATE
techniques.post('/', (req, res) => {
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