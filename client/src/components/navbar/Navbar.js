import React, {Component} from 'react';

class Navbar extends Component {
    disconnectUser = () => {
        return localStorage.clear()
    }
    render(){
        const getToken = localStorage.getItem("userToken");
       
       //condition ternaire pour masquer les boutons 
       return (<div>
           {
           !!getToken ?  null :  <a href ="/register">inscrition</a>
               }
            {
            !!getToken ?  <a href ="/" onClick={this.disconnectUser} >deconnection</a> :  <a href ="/login" >connection</a>
                }
            
           
        </div>)
    }
    
}
export default Navbar;