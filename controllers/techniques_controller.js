const express = require('express');

const request = require('request');

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
        currentUser: req.session.currentUser,
        results: null // Stops error with new.ejs results conditional before searching for videos
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


// SEARCH YOUTUBE FOR VIDEOS
techniques.post('/new', (req, res) => {

    // res.send(req.body.search); // logs search term
    // Set options for API call
    const options = {
        url: 'https://www.googleapis.com/youtube/v3/search',
        method: 'GET',
        // Query String
        qs: {
            part: 'snippet',
            maxResults: 12,
            q: req.body.search || 'bjj techniques',
            type: 'video', // exclude channels and playlists
            key: 'AIzaSyBLMfcprLCQxeQTD-PAhnmQlI6yCMOnXzk'
        }
    }

    request(options, (error, response, body) => {
        console.log('error', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body', body);
        const results = JSON.parse(body);
        res.render('new.ejs', {
            currentUser: req.session.currentUser,
            results: results.items // sends array to .ejs
        });
    });
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
    // Split req.body into individual comments
    const commentsArray = req.body.notes.split(',');
    Technique.findByIdAndUpdate(
        req.params.id,
        {$set: {notes: commentsArray}},
        {new: true},
        (err, updatedTechnique) => {
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