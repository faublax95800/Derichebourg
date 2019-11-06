import React, {Component} from 'react';

class Personnel extends Component {
    state = {
        user: this.props.user
    }

    formatDate = date => {
        const formatDate = new Date(date);
        return formatDate.toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
    };

    render(){
        console.log(this.state.user)
        return (
            <div>

                {this.state.user.map(obj => {
                    return <>
                    <h4>Prénom : {obj.prenom}</h4>
                    <h4>Nom: {obj.nom}</h4>
                    <h4>mail : {obj.email}</h4>
                    <h4>Matricule : {obj.matricule}</h4>
                    <h4>créer le : {this.formatDate(obj.created_at)}</h4>
                    </>
                })}
            </div>
        )
    }

}
export default Personnel;