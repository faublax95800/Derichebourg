import React, { Component } from "react";
import axios from "axios";

class Application extends Component {
  state = {
    dataApplication: [],
    filterModel: [],
    historyLoaning: []
  };

  componentDidMount() {
    const userSelected = localStorage.getItem('userSelected')
    const userSelectedParse = JSON.parse(userSelected)

    axios
      .get("http://localhost:8080/inventaire/application")
      .then(res => this.setState({ dataApplication: res.data }));
    axios
      .get(`http://localhost:8080/inventaire/history/${userSelectedParse.matricule}`)
      .then(res => this.setState({historyLoaning: res.data}))
   console.log('test', this.state.historyLoaning)   
  }


  findModel = (event) => {
    const name = event.target.value
    const result = this.state.dataApplication.filter(application => application.libelle_application === name)
    console.log(result)
    this.setState({ filterModel: result })
}
  handleSubmit =()=>{
    const userSelected = localStorage.getItem('userSelected')
    const userSelectedParse = JSON.parse(userSelected)
    const currentObj = this.state.filterModel.find(element => element)
    const result = {
      matricule : userSelectedParse.matricule, 
      id_materiel: currentObj.id,
      code_materiel : currentObj.code_application
    }
    axios
    .post("http://localhost:8080/inventaire/loaning", result)
    .then(res =>{
      console.log(res.data);
    })
    .catch(err=>{
      console.log(err.response);
      
    });
   
  };
  render() {

    const { dataApplication, historyLoaning } = this.state;
    console.log(dataApplication, historyLoaning)
    
    return (
      <div>
        <select onClick={this.findModel}>
          {this.state.dataApplication.map(application =>{
            return <option key={application.id}>{application.libelle_application}</option>
            })}</select>
            <button onClick={this.handleSubmit}>Enregistrer l'emprunt</button>
            {
              this.state.historyLoaning.map(obj=> <p>{obj.libelle_application}</p>)
            }
        
      </div>
    );
  }
}

export default Application;
