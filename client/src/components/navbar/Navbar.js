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
      <div className="" style={{backgroundColor:"#992222"}}>
        {!!getToken ? null : <a className="badge badge-light" href="/register">Inscription</a>}
        {!!getToken ? (
          <div>
            {" "}
            <p>Bienvenue {`${getMyUser.map(user => user.prenom)}`}</p>
            <a className="btn btn-outline-light" href="/" onClick={this.disconnectUser}>
              Deconnexion
            </a>{" "}
          </div>
        ) : (
          <a className="badge badge-danger" href="/login">Connexion</a>
        )}
      </div>
    );
  }
}
export default Navbar;
