import React, { Component } from "react";
import axios from "axios";

class Materiel extends Component {
  state = {
    dataMateriel: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/inventaire/materiel")
      .then(res => this.setState({ dataMateriel: res.data }));
  }
 
  findModel = (name) => {
    console.log('name',name);
    
    const result = this.state.dataMateriel.filter(materiel => materiel.Libellé_materiel == name)
   return(<select>{  result.map(materiel => {
    return <option key={materiel.id} >{materiel.model}</option> })} </select>
) }

  render() {
    console.log('test',this.state.dataMateriel);
    return (
      <div>
        {// condition si on a un token j'ai un user afficher sinon pas connecter
          <select >
            {  this.state.dataMateriel.map(materiel => {
            return <option onClick = {()=>this.findModel(materiel.Libellé_materiel) } key={materiel.id} >{materiel.Libellé_materiel}</option> })}
          </select>
        
        }
      </div>
    );
  }
}
export default Materiel;
