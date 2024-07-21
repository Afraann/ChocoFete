// server/models/Item.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: String
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
