import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';
// import {} from 'jquery.cookie';

import {NavLink} from 'react-router-dom';


axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class Attendance extends Component{
    
    state = {
        list:[],
    }

    attendanceCheck = async () =>{
        let checkAtt=[0];

        this.state.list.forEach((item)=>{
            checkAtt[item.id]=$(`input:checkbox[name="${item.id}"]`).is(":checked")
        })
        const send_param={
            headers,
            checkAtt,
        }
        
        try{
            const result = await axios.post('http://localhost:8080/attendance/checkAtt', send_param);
            if(result.data.list){
                this.setState({
                    list:result.data.list
                })
            }
        }catch(err){
            return null;
        }

    }

    getList= async ()=>{        
        try{
            const result = await axios.post('http://localhost:8080/list/show', {headers});
            if(result.data.list){
                this.setState({
                    list:result.data.list
                })
            }
        }catch(err){
            return null;
        }
    }

    componentWillMount(){
        this.getList();
    }



    render(){
        const attendanceStyle={
            width:500,
        }

        let list = this.state.list.map((item)=>{ 
            return (
                <tr key={item.id}>
                    <td>{item.pasture}</td>
                    <td>{item.farm}</td>
                    <td>{item.name}</td>
                    <td><input type="checkbox" name={item.id}></input></td>
                </tr>
            )
        })


        return(
            <div>

                <table className="table" style={attendanceStyle}>
                    <thead >
                        <tr>
                            <td>초원</td>
                            <td>목장</td>
                            <td>이름</td>
                            <td>출석</td>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <NavLink to="/showgraph"><button onClick={this.attendanceCheck}>submit</button></NavLink>
            </div>
        )
    }
}

export default Attendance;