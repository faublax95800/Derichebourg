import React, {Component} from 'react';
import axios from 'axios';


class Materiel extends Component {
    state = {
        dataMateriel:[]
    }

    componentDidMount(){
        axios.get("http://localhost:8080/materiel").then(res =>
        this.setState({dataMateriel:res.data}),
        )
    }

    render (){
        console.log(this.state.dataMateriel)
        return ( <div> 
           {
                // condition si on a un token j'ai un user afficher sinon pas connecter
                     this.state.dataMateriel.map(materiel=>{
                         console.log(materiel)
                        return(
                        <div key={materiel.id}>
                        <p>{materiel.Code_materiel}</p>
                        <p>{materiel.Libellé_materiel}</p>
                        <p>{materiel.Marque}</p>
                        <p>{materiel.Model}</p>
                        </div>)
                    })                       
                
            }
        </div>)
    }
}
export default Materiel;