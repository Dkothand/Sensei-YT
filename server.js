// DEPENDENCIES
const express = require('express');
const methodOverride  = require('method-override');
require('dotenv').config();
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const session = require('express-session');


const techniquesController = require('./controllers/techniques_controller.js');
const usersController = require('./controllers/users_controller.js');
const sessionsController = require('./controllers/sessions_controller.js');


// PORT
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;


// DATABASE
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'library';


// CONNECT TO MONGO
mongoose.connect(MONGODB_URI,  { useNewUrlParser: true});


// ERROR / SUCCESS
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


// OPEN CONNECTION TO MONGO
db.on('open' , ()=>{});


// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
//use public folder for static assets
app.use(express.static('public'));
//use method override
app.use(methodOverride('_method'));

// MIDDLEWARE - SESSION
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));


// MIDDLEWARE - CONTROLLERS
app.use('/techniques', techniquesController);
app.use('/users', usersController);
app.use('/sessions', sessionsController);


// MIDDLEWARE - ERROR HANDLERS (PUT AT END OF MIDDLEWARE)
// Catches any route that's not defined already
app.use((req, res, next) => {
  let err = new Error('Page Not Found');
  err.statusCode = 404;
  err.shouldRedirect = true; // allows middleware to redirect
  next(err);
})

app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500; // Set generic error status

  if (err.shouldRedirect) {
    res.render('error.ejs', { //renders error page
      error: err
    })
  } else {
    res.status(err.statusCode).send(err.message);
  }
});


// app.use(function(err, req, res, next) {
//   console.error(err.message); // Log error message in our server's console
//   if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
//   res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
// });


// ROUTES



// localhost:3000
// redirects to /techniques for index page
// create into landing/home page down the road
app.get('/' , (req, res) => {
  res.redirect('/techniques');
});


// LISTENER
app.listen(PORT, () => console.log( 'Listening on port:', PORT));