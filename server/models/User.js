// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  mobile: String,
  address: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
