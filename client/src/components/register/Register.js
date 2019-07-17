import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component {
    state = {
        nom: "",
        prenom: "",
        matricule: "",
        email: "",
        password: "",
    }
    //pour n'utiliser que certaint caracteres 
    //probleme 
    handleChange(event) {
        const value = (event.target.validity.valid) ? event.target.value : this.state.matricule; 
        this.setState({matricule: value}) 
    }

    getInputValue = (event) =>{
        this.setState({
            [event.target.name]: event.target.value,
        })
    } 
   

    handleSubmit = (event) =>{
        event.preventDefault()
        const {nom, prenom, matricule, email, password} = this.state
        const user = {
            nom: nom,
            prenom: prenom,
            matricule: matricule,
            email: email,
            password: password
        } 
        axios.post("http://localhost:8080/register", user).then(res =>{
            console.log(res.data);
            
        }).catch(err=>{
            console.log(err)            
        })

    }

    render(){
        console.log(this.state.nom);
        const {nom, prenom, email, password} = this.state
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
            
                <input
                value ={nom}
                placeholder="nom"
                type="text"
                name="nom"
                required
                onChange ={this.getInputValue}/>
                

                <input
                value ={prenom}
                placeholder="prenom"
                type="text"
                name="prenom"
                required
                onChange ={this.getInputValue}
                />

                <input
                placeholder="matricule"
                type="text"
                pattern="[0-9]*"
                name="matricule"
                required
                onInput={this.handleChange.bind(this)} value={this.state.matricule}/>

                <input
                value ={email}
                placeholder="email"
                type="email"
                name="email"
                required
                onChange ={this.getInputValue}/>
                

                <input
                value ={password}
                placeholder="mot de passe"
                type="password"
                name="password"
                required
                onChange ={this.getInputValue}/>
                

                <button>m'inscrire</button>
                        
                </form>
            </div>
        )
    }
}

export default Register;