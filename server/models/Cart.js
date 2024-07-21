// server/models/Cart.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: String,
  items: [{
    itemId: String,
    quantity: Number
  }]
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
