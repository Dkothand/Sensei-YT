// DEPENDENCIES
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;

const techniquesController = require('./controllers/techniques_controller.js');

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


// CONTROLLERS
app.use('/techniques', techniquesController);


// ROUTES
//localhost:3000
app.get('/' , (req, res) => {
  res.redirect('/techniques');
});


// LISTENER
app.listen(PORT, () => console.log( 'Listening on port:', PORT));