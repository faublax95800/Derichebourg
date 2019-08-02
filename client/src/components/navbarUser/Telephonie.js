import React, {Component} from 'react';
import axios from 'axios'

class Telephonie extends Component {
    state = {
        dataTelephonie:[]
    }

    componentDidMount(){
        axios.get("http://localhost:8080/telephonie").then(res =>
        this.setState({dataTelephonie:res.data}),
        )
    }

render (){
    console.log(this.state.dataTelephonie);
    
    return(

        <div></div>
    )
}
}

export default Telephonie;