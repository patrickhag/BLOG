const mongoose = require('mongoose')
const { Schema, model } = mongoose

userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 5,
  },
  password: {
    type: String,
    required: true,
  },
})

module.exports = model('users', userSchema)
