import React, { Component } from "react";
import axios from "axios";

class EditUser extends Component {
  state = {
    id: "",
    nom: "",
    prenom: "",
    matricule: "",
    email: ""
  };

  componentDidMount() {
    const editUser = localStorage.getItem("editUser");
    const editUserParse = JSON.parse(editUser);
    const { id, nom, prenom, matricule, email } = editUserParse;

    this.setState({
      id: id,
      nom: nom,
      prenom: prenom,
      matricule: matricule,
      email: email
    });
  }

  //pour n'utiliser que les chiffres
  //probleme
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
    const { nom, prenom, matricule, email, id } = this.state;
    const editUser = {
      nom: nom,
      prenom: prenom,
      matricule: matricule,
      email: email
    };
    axios
      .put(`http://localhost:8080/auth/user/${id}`, editUser)
      .then(res => {
        alert(res.data.message);
        localStorage.removeItem("editUser");
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    const { nom, prenom, email } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={nom}
            placeholder="nom"
            type="text"
            name="nom"
            required
            onChange={this.getInputValue}
          />

          <input
            value={prenom}
            placeholder="prenom"
            type="text"
            name="prenom"
            required
            onChange={this.getInputValue}
          />

          <input
            placeholder="matricule"
            type="text"
            pattern="[0-9]*"
            name="matricule"
            required
            onInput={this.handleChange.bind(this)}
            value={this.state.matricule}
          />

          <input
            value={email}
            placeholder="email"
            type="email"
            name="email"
            required
            onChange={this.getInputValue}
          />

          <button>Modifier</button>
        </form>
      </div>
    );
  }
}

export default EditUser;
