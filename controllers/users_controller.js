const express = require('express');
const users = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

// SHOW (FAVORITES)
users.get('/', (req, res) => {
    console.log(req.session.currentUser)
    res.render('users/index.ejs', {
        currentUser: req.session.currentUser
    });
});


//  NEW
users.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

// FAVORITES
users.get('/:id', (req, res) => {
    const favTechnique = req.params.id;
    // console.log(favTechnique);
    // console.log(req.session.currentUser._id)
    User.findByIdAndUpdate(
        req.session.currentUser._id, 
        {$push: {favorites: favTechnique}},
        {new: true},
        (err, foundUser) => {
        if (err) {
            console.log(err)
        }
        console.log(foundUser);
        res.redirect('/users/');
    })
})


// CREATE
users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        if (err) {
            console.log(err);
        };
        console.log(createdUser);
        res.redirect('/');
    });
});

module.exports = users;