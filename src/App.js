import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import ItemPage from './components/ItemPage';
import CartPage from './components/CartPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact component={LandingPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/main" component={MainPage} />
          <Route path="/item/:id" component={ItemPage} />
          <Route path="/cart" component={CartPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
