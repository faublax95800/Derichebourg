import React, { Component } from "react";
import axios from "axios";

class Telephonie extends Component {
  state = {
    dataTelephonie: [],
    filterModel: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/inventaire/telephonie")
      .then(res => this.setState({ dataTelephonie: res.data }));
  }

  findModel = (event) => {
    const name = event.target.value
    console.log('dans la fonction')
    const result = this.state.dataTelephonie.filter(telephonie => telephonie.libelle_telephonie === name)
    console.log(result)
    this.setState({ filterModel: result })
}

handleSubmit =() => {
  const userSelected = localStorage.getItem('userSelected')
  const userSelectedParse = JSON.parse(userSelected)
  const currentObj = this.state.filterModel.find(element => element)
  const result = {
    matricule : userSelectedParse.matricule, 
    id_telephonie: currentObj.id,
    code_telephonie : currentObj.code_telephonie
  }
}

render() {
  console.log(this.state.dataTelephonie);
  return (
    <div>
      <h1>en cours de creation</h1>
      <select onClick={this.findModel}>
        {this.state.dataTelephonie.map(telephonie =>{
          return <option key={telephonie.id}>{telephonie.libelle_telephonie}</option>
          })}</select>
          <button onClick={this.handleSubmit}>Enregistrer l'emprunt</button>
      
    </div>
  );
}
}


export default Telephonie;
