const express = require('express');
const users = express.Router();
const User = require('../models/user.js');

//  NEW
users.get('/new', (req, res) => {
    res.render('users/new.ejs');
});


// CREATE
users.post('/', (req, res) => {
    User.create(req.body, (err, createdUser) => {
        if (err) {
            console.log(err);
        };
        console.log(createdUser);
        res.redirect('/');
    })
})

module.exports = users;