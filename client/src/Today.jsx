import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';

import {NavLink} from 'react-router-dom';

axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class Today extends Component{
    state={
        oldList:[],
        newList:[],

    }

    
    attendanceCheck = async()=>{
        try{
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
                checkAtt,
            }
            const result = await axios.post('http://localhost:8080/attendance/checkAtt', send_param);
            if(result.data.message){
                alert(result.data.message);
            }else{
                alert('출석 실패');
            }
        }catch(err){
            console.log(err);
            alert("출석에러");
        }
    }

    makeTableList = (list)=>{
        let result = list.map((item)=>{
            return (
                <tr key={item.id}>
                    <td>{item.pasture}</td>
                    <td>{item.farm}</td>
                    <td>{item.name}</td>
                    <td><input type="checkbox" name={item.id}></input></td>
                </tr>
            )
        })
        return result
    }

    getList = async()=>{
        try{
            const oldList = await axios.post('http://localhost:8080/list/show', {headers});
            const newList = await axios.post('http://localhost:8080/list/newList', {headers});
            if(oldList.data.list && newList.data.list){
                this.setState({
                    oldList:oldList.data.list,
                    newList:newList.data.list,
                })
            }else{
                alert('목록을 불러오는데 실패했습니다');
            }
        }catch(err){   
            alert('목록을 불러오는데 실패했습니다');
        }
    }

    componentWillMount(){
        this.getList();
    }

    render(){
        const attendanceStyle={
            width:500,
        }

        let oldList = this.makeTableList(this.state.oldList);
        let newList = this.makeTableList(this.state.newList);
       


        return(
            <div>
                <table className="table" style={attendanceStyle}>
                    <thead>
                        <tr>
                            <td>초원</td>
                            <td>목장</td>
                            <td>이름</td>
                            <td>출석</td>
                        </tr>
                    </thead>
                    <tbody>
                        {oldList}
                        <tr>
                            <td colSpan="4">새친구들</td>
                        </tr>
                        {newList}
                    </tbody>

                </table>
                <NavLink to="/showgraph"><button onClick={this.attendanceCheck}>submit</button></NavLink>
            </div>
        )
    }
}

export default Today;