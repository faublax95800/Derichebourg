import React, { Component } from "react";
import axios from "axios";

class Application extends Component {
  state = {
    dataApplication: []
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/inventaire/application")
      .then(res => this.setState({ dataApplication: res.data }));
  }
  render() {
    console.log(this.state.dataApplication);
    return (
      <div>
        {this.state.dataApplication.map(application => {
          console.log(application);
          return (
            <div key={application.id}>
              <p>{application.Code_application}</p>
              <p>{application.Libelle_application}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Application;
