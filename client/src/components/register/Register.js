import React, { Component } from "react";
import axios from "axios";
// import "./Register.css";

class Register extends Component {
  state = {
    nom: "",
    prenom: "",
    matricule: "",
    email: "",
    password: ""
  };
  //pour n'utiliser que certaint caracteres
  //probleme
  handleChange(event) {
    const value = (event.target.validity.valid)
      ? event.target.value
      : this.state.matricule;
    this.setState({ matricule: value });
  }

  getInputValue = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { nom, prenom, matricule, email, password } = this.state;
    const user = {
      nom: nom,
      prenom: prenom,
      matricule: matricule,
      email: email,
      password: password
    };
    axios
      .post("http://localhost:8080/auth/register", user)
      .then(res => {
        alert(res.data.message);
        this.props.history.push("/login");
      })
      .catch(err => {
        console.log(err.response);
      });
  };
render() {
    const { nom, prenom, email, password } = this.state;
    return (
    <div className="container">
    <form onSubmit={this.handleSubmit}>
      <h3>Inscription</h3>
        <div class="form-group mb-2">
          <label class="label">Nom</label>
            <input class="form-control"
                  value={nom}
                  placeholder="nom"
                  type="text"
                  name="nom"
                  required
                  onChange={this.getInputValue}/>
        </div>

        <div class="form-group mb-2">
          <label class="label">Prenom</label>
            <input class="form-control"
                  value={prenom}
                  placeholder="prenom"
                  type="text"
                  name="prenom"
                  required
                  onChange={this.getInputValue}/>
        </div>
 

<div class="form-group mb-2 border border-white">
        <label class="label">Matricule</label>
              <input class="form-control"
                placeholder="matricule"
                type="text"
                pattern="[0-9]*"
                onInput={this.handleChange.bind(this)}
                value={this.state.matricule}/>
      </div>

      <div class="form-group mb-2">
        <label class="label">E-mail</label>
              <input class="form-control"
                value={email}
                placeholder="ex: votre@mail.fr"
                type="email"
                name="email"
                required
                onChange={this.getInputValue}/>

    </div>
      <div class="form-group mb-2">
        <label class="label" style={{ width: '500px'}}>Mot de passe</label>
            <input class="form-control"
              value={password}
              placeholder="mot de passe"
              type="password"
              name="password"
              required
              onChange={this.getInputValue}/>
      </div>

      <button  type="submit" class="btn btn-primary">m'inscrire</button>

    </form> 
    </div>
    );
  }
}

export default Register;