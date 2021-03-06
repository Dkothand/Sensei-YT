const express = require('express');
const mongoose = require('mongoose');
const users = express.Router();
const Technique = require('../models/technique.js');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next();
    } else {
        let err = new Error('You must log in first!')
        err.statusCode = 401;
        next(err);
    }
};

// SHOW (FAVORITES)
users.get('/', isAuthenticated, (req, res) => {
    // console.log(req.session.currentUser)
    // const favoritesArray = [];
    const favorites = req.session.currentUser.favorites;
    console.log(favorites);

    const favoritesIds = favorites.map(elem => mongoose.Types.ObjectId(elem));
    // console.log(favorites);
    // console.log(favorites);
    // console.log(favoritesIds);

    // try wrapping favorites array items in ObjectID
    Technique.find({
        '_id': { $in: favoritesIds}
    }, (err, foundTechniques) => {
        if (err) {
            console.log(err)
        }
        const favoritesArray = foundTechniques;
        console.log(favoritesArray)
        res.render('users/index.ejs', {
            currentUser: req.session.currentUser,
            favorites: favoritesArray
        });
    });
});


//  NEW USER PAGE
users.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

// CREATE NEW USER
users.post('/', (req, res, next) => {
    // Sets isAdmin boolean on views/users/new.ejs
    // if (req.body.isAdmin === 'on') {
    //     req.body.isAdmin = true;
    // } else {
    //     res.body.isAdmin = false;
    // }
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        if (err) {
            let err = new Error('Conflict: That Username already exists!');
            err.statusCode = 409;
            err.shouldRedirect = true;
            next(err);
            // console.error(err);
            // next(err) // Pass error to Express
        } else {
            console.log(createdUser);
            // Log user in on creation
            req.session.currentUser = createdUser;
            res.redirect('/');
        }
    });
});

// ADD FAVORITE
users.post('/:id', (req, res) => {
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
        // Save changes to req.session and render
        req.session.currentUser = foundUser;
        req.session.save((err) => {
            res.redirect('/users/');
        })
    });
});

// REMOVE FAVORITE
users.delete('/:id', (req, res) => {
    // res.send(`Got delete request for ${req.params.id}`)
    // Remove technique id from users favorites array
    // Get id of technique to remove
    const removeFavoriteId = req.params.id;
    // Update User document by removing id of technique from favorites array
    User.findByIdAndUpdate(
        req.session.currentUser._id,
        {$pull: {favorites: removeFavoriteId}},
        {new: true},
        (err, updatedUser) => {
        if (err) {
            console.log(err)
        }
        console.log(updatedUser);
        // Save changes to req.session and rerender
        req.session.currentUser = updatedUser;
        req.session.save((err) => {
            res.redirect('/users/');
        });
    });
});

module.exports = users;