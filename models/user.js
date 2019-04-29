const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {type: Array, default: []},
  isAdmin: {type: Boolean, default: false}
})

const User = mongoose.model('User', userSchema)

module.exports = User