import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class Home extends Component{
    state = {
        listUsers:[],
        search:''
    }
    //cycle de vie 
   componentDidMount(){
       this.listUsers()
   }

    listUsers (){
        console.log("dans la fonction");
//ici je fais appel a ma liste user (l'url vient du back)
        axios.get("http://localhost:8080/users").then(res =>{
//injecter l'objet ds mon state plus haut            
        this.setState({listUsers: res.data})
        }).catch(err=>{
            console.log(err)
            //console.log(err.res.data.message);
        })
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
    
    render(){
        const getToken = localStorage.getItem("userToken");
        const filteredUsers = this.state.listUsers.filter(user => {
            return user.prenom.toLowerCase().includes(this.state.search.toLowerCase())
          });

          console.log(filteredUsers)
          //champ de recherche 
        return(<div>
                  <input
          type="text"
          name="search"
          placeholder="Votre recherche"
          value={this.state.search}
          onChange={this.handleChange}
        />
            {
                // condition si on a un token j'ai un user afficher sinon pas connecter
                    !!getToken ?  filteredUsers.map(user=>{
                        return(
                        <div key={user.id}>
                        <p>{user.prenom}</p>
                        <p>{user.matricule}</p>
                        <Link to={`/user/${user.id}`}>voir fiche user</Link>
                        </div>)
                    }): <p>page d'accueil</p>                       
               
            }
            {
            
            }
        </div>)
        
    }
}
export default Home;