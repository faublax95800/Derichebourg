import React, { Component } from "react";
import "./Navbar.css"
class Navbar extends Component {
  disconnectUser = () => {
    return localStorage.clear();
  };
  render() {
    const getToken = localStorage.getItem("userToken");
    //je recup ce que j'ai ds le local storage
    const getMyUser = JSON.parse(localStorage.getItem("myUser"));
    //condition ternaire pour masquer les boutons
    return (
      <div className="" style={{backgroundColor:"#992222"}}>
        {!!getToken ? null : <a type="button" class="btn btn-outline-light" href="/register">Inscription</a>}
        {!!getToken ? (
          <div className="centerNavBar">
            {" "}
            <h1>Bienvenue {`${getMyUser.map(user => user.prenom)}`}</h1>
            <a className="btn btn-outline-light" href="/" onClick={this.disconnectUser}>
              Deconnexion
            </a>{" "}
          </div>
        ) : (
          <a type="button" class="btn btn-light" href="/login">Connexion</a>
        )}
      </div>
    );
  }
}
export default Navbar;
