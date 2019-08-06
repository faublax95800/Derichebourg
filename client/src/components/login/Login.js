import React, { Component } from "react";
import axios from "axios";

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="matricule"
            type="text"
            pattern="[0-9]*"
            name="matricule"
            required
            onChange={this.handleChange.bind(this)}
            value={this.state.matricule}
          />

          <input
            value={password}
            placeholder="mot de passe"
            type="password"
            name="password"
            required
            onChange={this.getInputValue}
          />

          <button>connexion</button>
        </form>
      </div>
    );
  }
}

export default Login;
