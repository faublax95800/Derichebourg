import React, { Component } from "react";
import axios from "axios";
// import ModalComfirm from "../navbarUser/shared/ModalComfirm.js"

class Application extends Component {
  state = {
    dataApplication: [],
    filterModel: [],
    historyLoaning: [],
    show: false,
    msgErr: ""
  };

  componentDidMount() {
   
//on veut recup ce qu'il y a dans le back au niveau application
    axios
      .get("http://localhost:8080/inventaire/application")
      .then(res => {
        console.log(res)
        this.setState({ dataApplication: res.data })
      })
      //recup l'historique d'emprunt du salarié
    axios
      .get(`http://localhost:8080/inventaire/history/${this.props.user[0].matricule}`)
      .then(res => {
        console.log(res)
        this.setState({ historyLoaning: res.data })
    })  
  }

  // componentDidUpdate(prevstate){
  //   //console.log(prevstate);
    
  // }

  //recup ce que j'ai cliqué dans le menu déroulant
  findModel = (event) => {
    const name = event.target.value
    //filtre et me ressort le resultat attendu au clique
    const result = this.state.dataApplication.filter(application => application.libelle_application === name)
    console.log(result)
    //maj le state
    this.setState({ filterModel: result })
  }

//pour enlever le modal
  hideModal =()=>{
    this.setState({show: false})
  }

  //pour supp un emprunt
  removeLoaning = (obj) => {
    axios.delete(`http://localhost:8080/inventaire/deleteLoaning/${obj.matricule}/${obj.id}`).then(res => {
      this.setState(prevState => {
        return {
          historyLoaning: prevState.historyLoaning.filter(
            item => item.id !== obj.id
          )
        };
      });
    })
  }

  handleSubmit =()=>{
    const userSelected = localStorage.getItem('userSelected')
    const userSelectedParse = JSON.parse(userSelected)
    const currentObj = this.state.filterModel.find(element => element)
    //2recupere l'emprunt
    const result = {
      matricule : userSelectedParse.matricule, 
      id_materiel: currentObj.id,
      code_materiel : currentObj.code_application
    }
    //pour verifier si l'user n'a pas deja emprunté le materiel
      const check = this.state.historyLoaning.map(lol => {
        return lol.libelle_application.includes(currentObj.libelle_application)
      }) // [true, false]

      //si oui ou non il est deja dans l'historique d'emprunt
    if(check.includes(true)){
        this.setState({msgErr:"Vous avez deja emprunté ce materiel", show: false})
      } else {
      axios
      //1 envoyer au back l'emprunt 
      .post("http://localhost:8080/inventaire/loaning", result)
      //3 le stock ici
      ``.then(res =>{
        this.setState({show: false})
        window.location.reload();
        // this.props.history.push("/")
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err); 
      });
    }
  };

  //pour rendre la date lisible 
  formatDate = date => {
    const formatDate = new Date(date);
    return formatDate.toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
  };

  render() {
//
    const { dataApplication, historyLoaning } = this.state;
    console.log('history', historyLoaning)

    // userConnect je recupere mes données depuis le localStorage qui est en string 
    // userConnectObj je transforme le tableau d'objet qui est en string en tableau (type d'origine) avec JSON.parse
    const userConnect = localStorage.getItem("myUser"); // '{age: 12}'
    const userConnectObj = JSON.parse(userConnect); // {age: 12}

    return (
      <div>
        {/* popup de comfirmation */}
        {this.state.show ? <div className="Modal__container">
          <div className="Modal__main">
            <h4>etes-vous  sur de vouloir comfirmer ?</h4>
            <div className="Modal__confirmModal"></div>
            <button className="btn btn-success"
            onClick={this.handleSubmit}
            >Oui</button>
            <button class="btn btn-light" onClick={this.hideModal}>Non</button>
          </div>
        </div>: null}
        {/* pr afficher le menun deroulant */}
        <select onClick={this.findModel}>
          {this.state.dataApplication.map(application =>{
            return <option key={application.id}>{application.libelle_application}</option>
            })}</select>
            {this.state.msgErr}
            <button className="btn btn-secondary" onClick={()=>this.setState({show : true})}>Enregistrer l'emprunt</button>
            <h1>Vos Emprunts</h1>
            {/* historique des emprunts */}
        {this.state.historyLoaning.map(obj => (
          <div key={obj.id}>
            <p>date d'emprunt {this.formatDate(obj.date_emprunt)}</p>
            <p>{obj.libelle_application}</p>
          {/* //affiche s'il est admin */}
            {userConnectObj[0].type === "admin" ?(
            <button className='btn btn-danger' 
            onClick={() => this.removeLoaning(obj)}>Supprimer</button>
            ): null}
            
          </div>
        ))}
        
      </div>
    );
  }
}

export default Application;
