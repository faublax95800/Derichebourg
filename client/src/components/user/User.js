import React, { Component } from "react";
import axios from "axios";
import Application from "../navbarUser/Application";
import Telephonie from "../navbarUser/Telephonie";
import EPI from "../navbarUser/EPI";
import Personnel from "../navbarUser/Personnel";
import Vehicule from "../navbarUser/Vehicule";
import Materiel from "../navbarUser/materiel/Materiel";
import './User.css';

class User extends Component {
  state = {
    user: [],
    nameComponent: ""
  };

  componentDidMount() {
    const userId = this.props.match.params.id;
    axios.get(`http://localhost:8080/user/${userId}`).then(res => {
      this.setState({ user: res.data });
    });
  }

  handleClick = nameComp => {
    console.log(nameComp);
    this.setState({ nameComponent: nameComp });
  };
  renderComp = () => {
    switch (this.state.nameComponent) {
      case "personnel":
        return <Personnel />;
      case "application":
        return <Application />;
      case "telephonie":
        return <Telephonie />;
      case "EPI":
        return <EPI />;
      case "materiel":
        return <Materiel />;
      case "vehicule":
        return <Vehicule />;
      default:
        console.log("peut etre un probleme");
    }
  };

  render() {
    return (
      <div >
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="btn btn-outline-dark" onClick={() => this.handleClick("personnel")}>Info general</li>
          <li className="btn btn-outline-dark" onClick={() => this.handleClick("application")}>Application</li>
          <li className="btn btn-outline-dark" onClick={() => this.handleClick("telephonie")}>Telephonie</li>
          <li className="btn btn-outline-dark" onClick={() => this.handleClick("EPI")}>E.P.I</li>
          <li className="btn btn-outline-dark" onClick={() => this.handleClick("materiel")}>Materiel</li>
          <li className="btn btn-outline-dark" onClick={() => this.handleClick("vehicule")}>Vehicule</li>
        </ul>

        {this.renderComp()}

        {// condition si on a un token j'ai un user afficher sinon pas connecter
        this.state.user.map(user => {
          return (
            <div className="user" key={user.id}>
              <p>{user.nom}</p>
              <p>{user.matricule}</p>
            </div>
          );
        })}

        <a className="btn btn-light" href="/">Home</a>
      </div>
    );
  }
}

export default User;
