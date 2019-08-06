import React, { Component } from "react";

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
      <div>
        {!!getToken ? null : <a href="/register">inscription</a>}
        {!!getToken ? (
          <div>
            {" "}
            <p>bienvenue {`${getMyUser.map(user => user.prenom)}`}</p>
            <a href="/" onClick={this.disconnectUser}>
              deconnection
            </a>{" "}
          </div>
        ) : (
          <a href="/login">connection</a>
        )}
      </div>
    );
  }
}
export default Navbar;
