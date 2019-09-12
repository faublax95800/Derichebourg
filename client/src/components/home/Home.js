import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    listUsers: [],
    search: ""
  };
  //cycle de vie
  componentDidMount() {
    this.listUsers();
  }

  listUsers() {
    //ici je fais appel a ma liste user (l'url vient du back)
    axios
      .get("http://localhost:8080/auth/users")
      .then(res => {
        //injecter l'objet ds mon state plus haut
        this.setState({ listUsers: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  editUser = user => {
    localStorage.setItem("editUser", JSON.stringify(user));
    this.props.history.push("/editUser");
  };

  selectUser = user => {
    localStorage.setItem('userSelected', JSON.stringify(user))
  }

  deleteUser = id => {
    axios
      .delete(`http://localhost:8080/auth/user/${id}`)
      .then(res => {
        console.log(res);
        this.setState(prevState => {
          //actualiser la liste user supp
          return {
            listUsers: prevState.listUsers.filter(userId => userId.id !== id)
          };
        });
      })
      .catch(err => {
        console.log(err);
        //console.log(err.res.data.message);
      });
  };

  render() {
    const getToken = localStorage.getItem("userToken");
    const userConnect = localStorage.getItem("myUser");
    const userConnectObj = JSON.parse(userConnect);

    //champ de recherche
    const filteredUsers = this.state.listUsers.filter(user => {
      return user.prenom
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });

    return (
      <div>
         {!!getToken ? (
          <input
            type="text"
            name="search"
            placeholder="Votre recherche"
            value={this.state.search}
            onChange={this.handleChange}
            />) : null}
        {// condition si on a un token j'ai un user afficher sinon pas connecter
        !!getToken ? (
          filteredUsers.map(user => {
            return (
              <div key={user.id}>
                <p>{user.prenom}</p>
                <p>{user.matricule}</p>
                <Link className="btn btn-secondary btn-sm" to={`/user/${user.id}`} onClick={this.selectUser(user)}>voir fiche user</Link>
                {userConnectObj[0].type === "admin" ? (
                  <div>
                    <button type="button" class="btn btn-outline-danger" onClick={() => this.deleteUser(user.id)}>
                      supprimer cet utilisateur
                    </button>
                    <button type="button" class="btn btn-outline-dark" onClick={() => this.editUser(user)}>
                      modifier cet utilisateur
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <p>page d'accueil</p>
        )}
      </div>
    );
  }
}
export default Home;
