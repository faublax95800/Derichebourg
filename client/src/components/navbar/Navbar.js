import React, { Component } from "react";
import "./Navbar.css"

class Navbar extends Component {
  //
  // componentDidMount () {
  //   if(localStorage.getItem("userToken")){
  //     setTimeout(function(){
  //       alert("ca marche")
  //             },1000)
  //   }
  // }

  //2 token cleaner pr preuve 
  disconnectUser = () => {
    return localStorage.clear();
  };

  render() {
    const getToken = localStorage.getItem("userToken");
    //je recup ce que j'ai dans le local storage
    const getMyUser = JSON.parse(localStorage.getItem("myUser"));
    //condition ternaire pour masquer les boutons
    return (
      <div className="" style={{backgroundColor:"#992222"}}>
       {/*on affiche le boutton si l'user  n'est pas connecté*/}
        {!!getToken ? null : <a type="button" class="btn btn-outline-light" href="/register">Inscription</a>}
        {/*s'il y a un token on affiche le bienvenu le nom du user et le boutton deconnexion*/}
        {!!getToken ? (
          <div className="centerNavBar">
            {" "}
          
            <h1>Bienvenue {`${getMyUser.map(user => user.prenom)}`}</h1>
            
            {/* 1 pour sup le token*/}
            <a className="btn btn-outline-light align-self-center" href="/" onClick={this.disconnectUser}>
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
