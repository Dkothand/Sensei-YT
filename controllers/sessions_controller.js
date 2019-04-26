const express = require('express');
const sessions = express.Router();
const User = require('../models/user.js');

sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});


sessions.post('/', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if (err) {
            console.log(err);
        };

        if (!foundUser) {
            res.send('<a href="/sessions/new">Invalid credentials</a>');
        } else if (req.body.password === foundUser.password) {
            console.log(foundUser)
            req.session.currentUser = foundUser;
            res.redirect('/');
        } else {
            res.send('<a href="/sessions/new">Invalid credentials</a>');
        }
    })
});

module.exports = sessions;