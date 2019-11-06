//capture ecran fiche user
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
  //3
  state = {
    user: [],
    nameComponent: ""
  };
//1user
  componentDidMount() {
    //creer un user id pour recup l'id du user
    //stock le user sur lequel on clique
    const userId = this.props.match.params.id;
    axios.get(`http://localhost:8080/auth/user/${userId}`).then(res => {
      this.setState({ user: res.data });
      console.log(res);
    });
  }
//2
  //pour recup le nom du compo sur lequel on clique
  handleClick = nameComp => {
    console.log(nameComp);
    this.setState({ nameComponent: nameComp });
  };

  renderComp = () => {
    //4
    //2user
    //le switch est = a un if 
    switch (this.state.nameComponent) {
      case "personnel": 
        return <Personnel user={this.state.user}/>;
      case "application":
        return <Application user={this.state.user}/>;
      case "telephonie":
        return <Telephonie user={this.state.user}/>;
      case "EPI":
        return <EPI user={this.state.user}/>;
      case "materiel":
        return <Materiel user={this.state.user}/>;
      case "vehicule":
        return <Vehicule user={this.state.user}/>;
      default:
        console.log("peut etre un probleme");
    }
  };

  //1
  render() {
    return (
      <div div class="">
        <ul class="nav nav-pills mb-3 d-flex justify-content-center" id="pills-tab" role="tablist">
          <li className="btn btn-outline-dark" onClick={() => this.handleClick("personnel")}>Info general</li>
          <li className="btn btn-outline-dark" onClick={() => this.handleClick("application")}>Application</li>
          <li className="btn btn-outline-light" onClick={() => this.handleClick("telephonie")}>Telephonie</li>
          <li className="btn btn-outline-light" onClick={() => this.handleClick("EPI")}>E.P.I</li>
          <li className="btn btn-outline-light" onClick={() => this.handleClick("materiel")}>Materiel</li>
          <li className="btn btn-outline-light" onClick={() => this.handleClick("vehicule")}>Vehicule</li>
        </ul>
        {/*pour agir sur le componant */}
        {this.renderComp()}
        <a className="btn btn-success" href="/">Home</a>
      </div>
    );
  }
}

export default User;
