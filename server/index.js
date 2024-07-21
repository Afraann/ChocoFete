const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Item = require('./models/Item');
const User = require('./models/User');
const Cart = require('./models/Cart');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/choco-fete', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.post('/api/register', async (req, res) => {
  const { username, email, mobile, address, password } = req.body;
  const newUser = new User({ username, email, mobile, address, password });
  try {
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching items' });
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching item' });
  }
});

app.post('/api/cart', async (req, res) => {
  const { itemId, quantity } = req.body;
  const userId = req.user.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ itemId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.itemId === itemId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ itemId, quantity });
      }
    }
    await cart.save();
    res.json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding item to cart' });
  }
});

app.get('/api/cart', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    const items = await Promise.all(cart.items.map(async (cartItem) => {
      const item = await Item.findById(cartItem.itemId);
      return { ...item._doc, quantity: cartItem.quantity };
    }));
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart items' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
