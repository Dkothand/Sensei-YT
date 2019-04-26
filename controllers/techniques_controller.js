const express = require('express');
const techniques = express.Router();
const Technique = require('../models/technique.js');

const embedLink = 'https://www.youtube.com/embed/';


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
        // Create embed link from db link
        foundTechnique.link = embedLink + foundTechnique.link;
        res.render('show.ejs', {
            move: foundTechnique
        })
    })
});

// EDIT
techniques.get('/:id/edit', (req, res) => {
    Technique.findById(req.params.id, (err, foundTechnique) => {
        if (err) {
            console.log(err)
        }
        res.render('edit.ejs', {
            move: foundTechnique
        })
    })
});

// CREATE
techniques.post('/', (req, res) => {
    // get just embed id from url
    req.body.link = req.body.link.split('=')[1];
    Technique.create(req.body, (err, createdTechnique) => {
        if (err) {
            console.log(err)
        }
        console.log(createdTechnique)
        res.redirect('/techniques')
    });
});

// UPDATE
techniques.put('/:id', (req, res) => {
    Technique.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedTechnique) => {
        if (err) {
            console.log(err)
        }
        console.log(updatedTechnique);
        res.redirect('/techniques/' + req.params.id);
    })
});

// DELETE
techniques.delete('/:id', (req, res) => {
    Technique.findByIdAndRemove(req.params.id, (err, removedTechnique) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/');
    });
});


module.exports = techniques;