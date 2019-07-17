import React from 'react';
import './App.css';
import Register from './components/register/Register.js';
import Login from './components/login/Login.js';
import Home from './components/home/Home.js';
import Navbar from './components/navbar/Navbar.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';


//exact = la que je souhaite avoir par defaut
function App() {
  return (
    <div className="App">
    <Router>
      <Navbar/>
      <div>
      <Route path = "/" component={Home} exact/>
      <Route path = "/register" component ={Register}/>
      <Route path = "/login" component ={Login}/>
      </div>
    </Router>
    </div>
  );
}

export default App;
