import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';

import {NavLink} from 'react-router-dom';


axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class EditAtt extends Component{
    
    state = {
        list:[],
        attList:[],
        attCheck:[],
        newFriend:[]
    }

    editDays = async () =>{
        let checkAtt=[0];

        this.state.list.forEach((item)=>{
            checkAtt[item.id]=$(`input:checkbox[name="${item.id}"]`).is(":checked")
        })
        this.state.newFriend.forEach((item)=>{
            checkAtt[item.id]=$(`input:checkbox[name="${item.id}"]`).is(":checked")
        })
        const send_param={
            headers,
            id: this.props.location.query.id,
            checkAtt,
        }
        try{
            const result = await axios.post('http://localhost:8080/attendance/editAtt', send_param);
            if(result.data.message){
                alert(result.data.message);
            }
        }catch(err){
            console.log(err)
        }
    }

   
    getList= async ()=>{      

        const send_param={
            headers,
            id: this.props.location.query.id,
        }  
        try{
            const result = await axios.post('http://localhost:8080/list/show', {headers});
            const attlist = await axios.post('http://localhost:8080/attendance/editList', send_param);
            if(result.data.list){
                this.setState({
                    list:result.data.list,
                    newFriend:result.data.newFriendList,
                    attList:attlist.data.list,
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
            let checked = false;
            this.state.attList.forEach((value)=>{
                if (value.id === item.id)
                    checked = true;
            })
            return (
                <tr key={item.id}>
                    <td>{item.pasture}</td>
                    <td>{item.farm}</td>
                    <td>{item.name}</td>
                    <td><input type="checkbox" defaultChecked={checked} name={item.id}></input></td>
                </tr>
            )
        })

        let newFriends = this.state.newFriend.map((item)=>{ 
            let checked = false;
            this.state.attList.forEach((value)=>{
                if (value.id === item.id)
                    checked = true;
            })
            return (
                <tr key={item.id}>
                    <td>{item.pasture}</td>
                    <td>{item.farm}</td>
                    <td>{item.name}</td>
                    <td><input type="checkbox" defaultChecked={checked} name={item.id}></input></td>
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
                        <td colspan="4">새친구들</td>
                        {newFriends}
                    </tbody>
                </table>
                <NavLink to="/showgraph"><button onClick={this.editDays}>submit</button></NavLink>
            </div>
        )
    }
}

export default EditAtt;