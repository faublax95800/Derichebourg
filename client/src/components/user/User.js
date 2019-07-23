import React, {Component} from 'react';
import axios from 'axios';
import Application from "../navbarUser/Application"
import Telephonie from "../navbarUser/Telephonie"
import EPI from "../navbarUser/EPI"
import Personnel from "../navbarUser/Personnel"
import Vehicule from "../navbarUser/Vehicule"
import Materiel from "../navbarUser/Materiel"

class User extends Component{
    state = {
        user:[],
        nameComponent: ""
    }

    componentDidMount(){
        const userId = this.props.match.params.id;
        axios.get(`http://localhost:8080/user/${userId}`).then(res=>{
            this.setState({user:res.data});
        })
    }

    handleClick = (nameComp) =>{
        console.log(nameComp);
        this.setState({nameComponent: nameComp})
    }
    renderComp = () =>{
        switch(this.state.nameComponent){
            case "personnel" : return <Personnel/>
            case "application" : return <Application/>
            case "telephonie" : return <Telephonie/>
            case "EPI" : return <EPI/>
            case "materiel" : return <Materiel/>
            case "vehicule" : return <Vehicule/>
        }
    }

    render(){
        console.log(this.state.user);
        
        return(<div>
            <ul>
            <li onClick={()=>this.handleClick("personnel")}>Info general</li>
            <li onClick={()=>this.handleClick("application")}>Application</li>
            <li onClick={()=>this.handleClick("telephonie")}>Telephonie</li>
            <li onClick={()=>this.handleClick("EPI")}>E.P.I</li>
            <li onClick={()=>this.handleClick("materiel")}>Materiel</li>
            <li onClick={()=>this.handleClick("vehicule")}>Vehicule</li>
            </ul>
            
            {this.renderComp()}

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