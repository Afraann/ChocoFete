import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart');
        setCartItems(response.data);
        const total = response.data.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalCost(total);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <div className="cart-page">
      <h2>Cart</h2>
      <div className="cart-items">
        {cartItems.map(item => (
          <div className="cart-item" key={item._id}>
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>{item.price} x {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="total-cost">
        <h3>Total Cost: {totalCost}</h3>
      </div>
      <button className="checkout-button">Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;
