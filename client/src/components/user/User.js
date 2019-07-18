import React, {Component} from 'react';
import axios from 'axios';

class User extends Component{
    state = {
        user:[]
    }
    componentDidMount(){
        const userId = this.props.match.params.id;
        axios.get(`http://localhost:8080/user/${userId}`).then(res=>{
            this.setState({user:res.data});
            
        })
    }
    
    render(){
        console.log(this.state.user);
        
        return(<div>
            <a href ="/personnel">information principal</a>
            <a href ="/application">application</a>
            <a href ="/EPI">E.P.I</a>
            <a href ="/materiel">materiel</a>
            <a href ="/telephonie">telephonie</a>
            <a href ="/vehicule">Vehicule</a>

            {
                // condition si on a un token j'ai un user afficher sinon pas connecter
                     this.state.user.map(user=>{
                        return(
                        <div key={user.id}>
                        <p>{user.nom}</p>
                        <p>{user.matricule}</p>
                        </div>)
                    })                       
                
            }

            <a href ="/">Home</a>
            </div>)
    }

}

export default User;