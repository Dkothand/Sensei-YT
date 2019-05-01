const express = require('express');
const sessions = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

// LOGIN VIEW
sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});


// LOGIN CREATE
sessions.post('/', (req, res, next) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if (!foundUser) {
            // res.send('<a href="/">Invalid credentials</a>');
            let err = new Error('Invalid credentials');
            err.statusCode = 401;
            next(err);
        } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            console.log(foundUser)
            req.session.currentUser = foundUser;
            res.redirect('/');
        } else {
            // res.send('<a href="/">Invalid credentials</a>');
            let err = new Error('Invalid credentials');
            err.statusCode = 401;
            next(err);
        }
    })
});


// LOGOUT
sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});


module.exports = sessions;