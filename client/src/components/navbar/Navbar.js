import React, { Component } from "react";
// import "./Navbar.css"
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
      <div class="" style={{backgroundColor:"#992222"}}>
        {!!getToken ? null : <a class="badge badge-light" href="/register">Inscription</a>}
        {!!getToken ? (
          <div>
            {" "}
            <p>Bienvenue {`${getMyUser.map(user => user.prenom)}`}</p>
            <a href="/" onClick={this.disconnectUser}>
              Deconnexion
            </a>{" "}
          </div>
        ) : (
          <a class="badge badge-danger" href="/login">Connexion</a>
        )}
      </div>
    );
  }
}
export default Navbar;
