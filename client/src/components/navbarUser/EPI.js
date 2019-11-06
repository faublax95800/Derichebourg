import React, {Component} from 'react';
import axios from "axios";

class EPI extends Component {
    state = {
        dataEpi: [],
        filterModel: []
    }

    componentDidMount() {
        axios
          .get("http://localhost:8080/inventaire/epi")
          .then(res => this.setState({ dataEpi: res.data }));
      }

    findModel = (event) => {
        const name = event.target.value
        console.log('dans la fonction')
        const result = this.state.dataEpi.filter(epi => epi.libelle_epi === name)
        console.log(result)
        this.setState({ filterModel: result })
        }

        handleSubmit =()=>{
            const userSelected = localStorage.getItem('userSelected')
            const userSelectedParse = JSON.parse(userSelected)
            const currentObj = this.state.filterModel.find(element => element)
            const result = {
              matricule : userSelectedParse.epi, 
              id_epi: currentObj.id,
              code_epi : currentObj.code_epi
            }
          }

    render() {
        console.log(this.state.dataEpi);
        return (
              <div>
                <h1>en cours de creation</h1>
                <select onClick={this.findModel}>
                  {this.state.dataEpi.map(epi =>{
                    return <option key={epi.id}>{epi.libelle_epi}</option>
                    })}</select>
                    <button onClick={this.handleSubmit}>Enregistrer l'emprunt</button>
                
              </div>
            );
          }
}
export default EPI;