const express = require('express');
const techniques = express.Router();
const Technique = require('../models/technique.js');

// Embed link, add video ID to end to embed in html
// const embedLinkPrefix = 'https://www.youtube.com/embed/';


// INDEX
techniques.get('/', (req, res) => {
    Technique.find({}, (err, foundTechniques) => {
        if (err) {
            console.log(err)
        }
        res.render('index.ejs', {
            moves: foundTechniques,
            currentUser: req.session.currentUser
        });
    });
});

// NEW
techniques.get('/new', (req, res) => {
    res.render('new.ejs', {
        currentUser: req.session.currentUser
    });
});

// SHOW
/*********** Passing random characters after technique/... crashes app, even with next(err) **********************/
techniques.get('/:id', (req, res, next) => {
    Technique.findById(req.params.id, (err, foundTechnique) => {
        if (err) {
            next(err);
        }
        res.render('show.ejs', {
            move: foundTechnique,
            currentUser: req.session.currentUser
        })
    })
});


// EDIT
techniques.get('/:id/edit', (req, res) => {
    if (req.session.currentUser) {
        Technique.findById(req.params.id, (err, foundTechnique) => {
            if (err) {
                console.log(err)
            }
            res.render('edit.ejs', {
                move: foundTechnique,
                currentUser: req.session.currentUser
            });
        });
    } else {
        res.redirect('/sessions/new');
    }
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


// ADD NOTE
// Getting ajax request to work with put route
// https://stackoverflow.com/questions/22820734/how-to-return-success-from-ajax-post-in-node-js
techniques.put('/:id/new', (req, res) => {
    Technique.findByIdAndUpdate(
        req.params.id,
        {$push: {notes: req.body.note}},
        {new: true},
        (err, updatedTechnique) => {
            // res.redirect('/techniques/' + req.params.id)
            res.end('{"Success": "Updated successfully"}');
    });
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