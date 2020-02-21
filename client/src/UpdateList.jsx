import React, {Component} from 'react';
import axios from 'axios';
// import $ from 'jquery';
// import {} from 'jquery.cookie';


axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class List extends Component{

    state = {
        list:[]
    }

    serach = async()=>{
        send_param={
            headers,
            
        }

        try{
            const result = await axios.post('http://localhost:8080/list/show', send_param);
            console.log(result);
            if(result.data.list){
                this.setState({
                    list:result.data.list
                })
                console.log(result.data.list[0].b_day)
            }
        }catch(err){
            return null;
        }
    }

    

    render(){

        return(
            <div>
                <input ref={ref=>this.search=ref}></input>
                <button onClick={this.search}>search</button>
            </div>
        )
    }
}

export default List;