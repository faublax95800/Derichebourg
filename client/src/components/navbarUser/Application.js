import React, { Component } from "react";
import axios from "axios";
import ModalComfirm from "../navbarUser/shared/ModalComfirm.js"

class Application extends Component {
  state = {
    dataApplication: [],
    filterModel: [],
    historyLoaning: [],
    show: false
  };

  componentDidMount() {
    const userSelected = localStorage.getItem('userSelected')
    const userSelectedParse = JSON.parse(userSelected)

    axios
      .get("http://localhost:8080/inventaire/application")
      .then(res => {
        console.log(res)
        this.setState({ dataApplication: res.data })
      })
    axios
      .get(`http://localhost:8080/inventaire/history/${userSelectedParse.matricule}`)
      .then(res => {
        console.log(res)
        this.setState({ historyLoaning: res.data })
    })  
  }

  componentDidUpdate(prevstate){
    //console.log(prevstate);
    
  }

  findModel = (event) => {
    const name = event.target.value
    const result = this.state.dataApplication.filter(application => application.libelle_application === name)
    console.log(result)
    this.setState({ filterModel: result })
}
  hideModal =()=>{
    this.setState({show: false})
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
      this.setState({show: false})
      //this.props.history.push("/")
      console.log(res.data);
    })
    .catch(err=>{
      console.log(err);
      
    });
  };

  formatDate = date => {
    const formatDate = new Date(date);
    return formatDate.toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
  };

  render() {

    const { dataApplication, historyLoaning } = this.state;
    console.log('history', historyLoaning)
    
    return (
      <div>
        {this.state.show ? <div className="Modal__container">
          <div className="Modal__main">
            <h4>etes-vous  sur de vouloir comfirmer ?</h4>
            <div className="Modal__confirmModal"></div>
            <button className="btn btn-primary"
            onClick={this.handleSubmit}
            >Oui</button>
            <button onClick={this.hideModal}>Non</button>
          </div>
        </div>: null}
        <select onClick={this.findModel}>
          {this.state.dataApplication.map(application =>{
            return <option key={application.id}>{application.libelle_application}</option>
            })}</select>
            <button onClick={()=>this.setState({show : true})}>Enregistrer l'emprunt</button>
            {
              this.state.historyLoaning.map(obj=> 
              <div>
                <p>date d'emprunt  {this.formatDate(obj.date_emprunt)}</p>
                <p>{obj.libelle_application}</p>
              </div>

              )}
        
      </div>
    );
  }
}

export default Application;
