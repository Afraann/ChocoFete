import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ItemPage.css';

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };
    fetchItem();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post('http://localhost:5000/api/cart', {
        itemId: id,
        quantity
      });
      alert('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="item-page">
      <img src={item.image} alt={item.name} />
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>{item.price}</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ItemPage;
