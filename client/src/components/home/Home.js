import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Home.css';
class Home extends Component {
  state = {
    listUsers: [],
    search: ""
  };
  //cycle de vie qui permet de monter un compo 
//1
  componentDidMount() {
    this.listUsers();
  }

  listUsers() {
    //ici je fais appel à ma liste user 
    axios
      .get("http://localhost:8080/auth/users")
      .then(res => {
        //injecter l'objet dans mon state plus haut
        this.setState({ listUsers: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
//mja de mes inputs
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
//redirection vers le composant modif l'utilisateur
  editUser = user => {
    localStorage.setItem("editUser", JSON.stringify(user));
    this.props.history.push("/editUser");
  };
//pour voir la fiche user
  selectUser = user => {
    localStorage.setItem('userSelected', JSON.stringify(user))
  }
//suppression d'un user
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
        {// condition si on a un token j'ai un user affiché sinon pas connecté
        !!getToken ? (
          filteredUsers.map(user => {
            
            return (
              <div key={user.id}>
                <p>{user.prenom}</p>
                <p>{user.matricule}</p>
                <Link className="btn btn-secondary btn-sm" to={`/user/${user.id}`} onClick={this.selectUser(user)}>voir fiche user</Link>
                {/*voir que si on est admin */}
                {userConnectObj[0].type === "admin" ? (
                  <div>
                    
                    <button type="button" class="btn btn-outline-danger" onClick={() => this.deleteUser(user.id)}>
                      supprimer cet utilisateur
                    </button>
                    <button type="button" class="btn btn-outline-dark" onClick={() => this.editUser(user)}>
                     {/* rediction l35 */}
                      modifier cet utilisateur
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <h1 class="shadow p-3 mb-5 bg-white rounded">Bienvenue</h1>
        )}
      </div>
    );
  }
}
export default Home;