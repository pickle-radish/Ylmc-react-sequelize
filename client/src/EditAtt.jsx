import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';

import {NavLink} from 'react-router-dom';

axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class EditAtt extends Component {
    state={
        oldList:[],
        newList:[],
        attList:[],
    }
    
    editDays = async () =>{
        let checkAtt=[0];

        this.state.oldList.forEach((item)=>{
            if($(`input:checkbox[name="${item.id}"]`).is(":checked")){
                checkAtt[item.id]=item.id
            }
        })
        this.state.newList.forEach((item)=>{
            if($(`input:checkbox[name="${item.id}"]`).is(":checked")){
                checkAtt[item.id]=item.id
            }
        })
        const send_param={
            headers,
            id: this.props.location.query.id,
            checkAtt,
        }
        try{
            const result = await axios.post(process.env.REACT_APP_REQ_ADDRESS+'/attendance/editAtt', send_param);
            if(result.data.message){
                alert(result.data.message);
            }
        }catch(err){
            alert("에러");
        }
    }

    checkList = (list)=>{
        const result = list.map((item)=>{ 
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

        return result
    }
   
    getAtt= async ()=>{    
        const send_param={
            headers,
            id: this.props.location.query.id,
        }  
        try{
            const oldList = await axios.post(process.env.REACT_APP_REQ_ADDRESS+'/list/show', {headers});
            const newList = await axios.post(process.env.REACT_APP_REQ_ADDRESS+'/list/newList', {headers});
            const attList = await axios.post(process.env.REACT_APP_REQ_ADDRESS+'/attendance/editList', send_param);
            if(oldList.data.list && newList.data.list && attList.data.list ){
                this.setState({
                    oldList:oldList.data.list,
                    newList:newList.data.list,
                    attList:attList.data.list,
                })
            }else{
                alert('관리자 로그인이 필요합니다');
            }
        }catch(err){
            return null;
        }
    }
    
    componentWillMount(){
        this.getAtt();
    }


    render(){
        const attendanceStyle={
            width:500,
        }

        let oldlist = this.checkList(this.state.oldList);
        let newlist = this.checkList(this.state.newList);

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
                        {oldlist}
                        <td colspan="4">새친구들</td>
                        {newlist}
                    </tbody>
                </table>
                <NavLink to="/showgraph"><button onClick={this.editDays}>submit</button></NavLink>
            </div>
        )
    }
}
export default EditAtt