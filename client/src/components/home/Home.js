import React, {Component} from 'react';
import axios from 'axios';

class Home extends Component{
    state = {
        listUsers:[]
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
    //id en attendant l'event onClick du vrais id 
    getUserById = (id) =>{
        //je recupere grace a mon back l'id selectionné
        //.then promesse d'une action 
       console.log(id);
       
        
    }
    
    render(){
        const getToken = localStorage.getItem("userToken");


        return(<div>
            {
                // condition si on a un token j'ai un user afficher sinon pas connecter
                    !!getToken ?  this.state.listUsers.map(user=>{
                        return(
                        <div key={user.id}>
                        <p>{user.nom}</p>
                        <p>{user.matricule}</p>
                        <button onClick = {()=>this.getUserById(user)} >voir fiche user</button>
                        </div>)
                    }): <p>page d'accueil</p>                       
               
            }
            {
            
            }
        </div>)
        
    }
}
export default Home;