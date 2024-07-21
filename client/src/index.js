import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/main" component={MainPage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
