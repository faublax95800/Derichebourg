import React, { Component } from "react";
import axios from "axios";
import "./Login.css";

class Login extends Component {
  state = {
    matricule: "",
    password: ""
  };
  //pour n'utiliser que certaint caracteres
  //probleme
  //setstate mettre a jours
  handleChange(event) {
    const value = event.target.validity.valid
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
    const { matricule, password } = this.state;
    const user = {
      matricule: matricule,
      password: password
    };
    axios
      .post("http://localhost:8080/auth/login", user)
      .then(res => {
        localStorage.setItem("userToken", res.data.token);
        this.props.history.push("/");
        //j'envoi 1 objet ds le local storage
        localStorage.setItem("myUser", JSON.stringify(res.data.user));
      })
      .catch(err => {
        console.log(err);
      });
  };

  // permet d'afficher les user dans home
  //password version destructuré
  //matrictule version normal
  render() {
    const { password } = this.state;
    return (
      <div className='container'>
        
        <form onSubmit={this.handleSubmit}>
        <h3>Connexion</h3>
          <div class="form-group mb-2">
            <label for="inputMatricule1">Matrictule</label>
            <input class="form-control"
              placeholder="matricule"
              type="text"
              pattern="[0-9]*"
              name="matricule"
              required
              onChange={this.handleChange.bind(this)}
              value={this.state.matricule}/>
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
          <button type="submit" class="btn btn-success">connexion</button>
        </form>
      </div>
    );
  }
}

export default Login;
