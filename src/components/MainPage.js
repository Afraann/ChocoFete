import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/MainPage.css';

const MainPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [items, setItems] = useState([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className={`main-page ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <div className="top-left">
          <button onClick={toggleDarkMode}>🌙</button>
        </div>
        <div className="top-center">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="top-right">
          <Link to="/account"><button>Account</button></Link>
          <Link to="/cart"><button>Cart</button></Link>
        </div>
      </header>
      <main>
        <div className="item-list">
          {items.map(item => (
            <Link to={`/item/${item._id}`} key={item._id}>
              <div className="item">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainPage;
