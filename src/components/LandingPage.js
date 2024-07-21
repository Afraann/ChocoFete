import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`landing-page ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <div className="top-left">
          <button onClick={toggleDarkMode}>🌙</button>
        </div>
        <div className="top-right">
          <Link to="/login"><button>Login</button></Link>
          <Link to="/register"><button>Register</button></Link>
        </div>
      </header>
      <main>
        <h1>ChocoFête</h1>
        <h2>Savoury Chocolates from Anywhere</h2>
        <div className="info-section">
          <div className="info-component">
            <img src="path/to/your/image1.jpg" alt="info1" />
            <p>Info about the project 1</p>
          </div>
          <div className="info-component">
            <img src="path/to/your/image2.jpg" alt="info2" />
            <p>Info about the project 2</p>
          </div>
          <div className="info-component">
            <img src="path/to/your/image3.jpg" alt="info3" />
            <p>Info about the project 3</p>
          </div>
          <div className="info-component">
            <img src="path/to/your/image4.jpg" alt="info4" />
            <p>Info about the project 4</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
