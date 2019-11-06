import React from "react";
import "./App.css";
import Register from "./components/register/Register.js";
import Login from "./components/login/Login.js";
import Home from "./components/home/Home.js";
import Navbar from "./components/navbar/Navbar.js";
//l20  à l24 dans react router 
//react router permet de faire de la navigation dans mon app
import { BrowserRouter as Router, Route } from "react-router-dom";
import User from "./components/user/User.js";
import EditUser from "./components/editUser/editUser";


//exact = le composant que je souhaite avoir par défaut
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div>
          <Route path="/" component={Home} exact />
          <Route path="/editUser" component={EditUser} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/user/:id" component={User} />
        </div>
      </Router>
    </div>
  );
}

export default App;
