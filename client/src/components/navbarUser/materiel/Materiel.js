import React, { Component } from "react";
import axios from "axios";
import './materiel.css';

class Materiel extends Component {
  state = {
    dataMateriel: [],
    filterModel: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/inventaire/materiel")
      .then(res => this.setState({ dataMateriel: res.data }));
  }
 
  findModel = (event) => {
    const name = event.target.value
    console.log('dans la fonction')
    const result = this.state.dataMateriel.filter(materiel => materiel.libelle_materiel === name)
    console.log(result)
    this.setState({ filterModel: result })
}

handleSubmit = () => {
  const userSelected = localStorage.getItem('userSelected')
  const userSelectedParse = JSON.parse(userSelected)
  const currentObj = this.state.filterModel.find(element => element)
  const result = {
    matricule : userSelectedParse.matricule, 
    id_materiel: currentObj.id,
    code_materiel : currentObj.code_materiel
  }
  // axios
  // .post("http://localhost:8080/inventaire/loaning")
  // .then(res => console.log(res))
}

  render() {
    console.log('result', this.state.dataMateriel)

    return (
      <div>
        <h1>en cours de creation</h1>
        {// condition si on a un token j'ai un user afficher sinon pas connecté
          <select onClick={this.findModel}>
            { this.state.dataMateriel.map(materiel => {
            return <option key={materiel.id} >{materiel.libelle_materiel}</option> })}
          </select>
        }<br />
        { <select className={this.state.filterModel.length === 0 ? 'selectModel' : 'selectModelShow' }>{ this.state.filterModel.map(materiel => <option key={materiel.id}>{materiel.marque}</option>)}</select> }
        <button onClick={this.handleSubmit}>Enregistrer l'emprunt</button>
      </div>
    );
  }
}
export default Materiel;