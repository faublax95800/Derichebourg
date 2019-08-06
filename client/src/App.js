import React from "react";
import "./App.css";
import Register from "./components/register/Register.js";
import Login from "./components/login/Login.js";
import Home from "./components/home/Home.js";
import Navbar from "./components/navbar/Navbar.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import User from "./components/user/User.js";
import EditUser from "./components/editUser/editUser";

//exact = la que je souhaite avoir par defaut
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
