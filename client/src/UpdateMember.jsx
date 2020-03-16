import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class UpdateMember extends Component{    
    state = {
        gender:"",
        isStudent:"",
        info:[],
    }

    expelled = async()=>{
        const send_param={
            headers,
            id:this.props.location.query.id,
            expelled:true,
        }
        try{
             const result = await axios.post(process.env.REACT_APP_REQ_ADDRESS+'/list/expelled', send_param);
             if(result.data.message){
                 alert(result.data.message);
                 
             }else{
                 alert("제적실패");
             }
        }catch(err){
            alert("제적실패");
        }
    }

    update = async ()=>{
        try{
            const send_param={
                headers,
                id: this.props.location.query.id,
                pasture:this.pasture.value,
                farm:this.farm.value,
                name:this.name.value,
                b_day:this.b_day.value,
                school:this.school.value,
                year:this.year.value,
                area:this.area.value,
                phone:this.phone.value,
                parents_phone:this.parents_phone.value,
                gender:this.state.gender,
                isStudent:this.state.isStudent,
            }
            const result = await axios.post(process.env.REACT_APP_REQ_ADDRESS+'/list/update', send_param);
            if(result.data.message){
                alert(result.data.message);
                return null
            }
        }catch(err){
            alert("수정 실패");
            return null;
        }
    }

    getInfo = async()=>{
        try{
            const send_param={
                headers,
                id: this.props.location.query.id,
            }
            const result = await axios.post(process.env.REACT_APP_REQ_ADDRESS+'/list/getInfo', send_param);
            if(result.data.info){
                this.setState({
                    info:result.data.info
                })
            }
        }catch(err){
            return null;
        }
    }

    handleChangeG=(event)=>{
        this.setState({
          gender: event.target.value
        });
    }
    handleChangeS=(event)=>{
        this.setState({
            isStudent: event.target.value
        });
    }

    componentWillMount(){
        this.getInfo();
    }

    render(){

        const categoryStyle={
            width:200,
        }

        let info = this.state.info
        if(info!==[]){
            let gender
            if(info.gender){
                gender= <span>
                            <input type="radio" id="male" name="gender" value="남자" defaultChecked onChange={this.handleChangeG}/>
                            <label for="male">남자</label>
                            <input type="radio" id="female" name="gender" value="여자" onChange={this.handleChangeG}/>
                            <label for="female">여자</label>
                        </span>
            }else{
                gender= <span>
                            <input type="radio" id="male" name="gender" value="남자"  onChange={this.handleChangeG}/>
                            <label for="male">남자</label>
                            <input type="radio" id="female" name="gender" value="여자" defaultChecked onChange={this.handleChangeG}/>
                            <label for="female">여자</label>
                        </span>
            }
            let isStudent
            if(info.isStudent){
                isStudent=
                    <span>
                        <input type="radio" id="studnet" name="isStudent" value="학생" defaultChecked onChange={this.handleChangeS}/>
                        <label for="student">학생</label>
                        <input type="radio" id="teacher" name="isStudent" value="선생" onChange={this.handleChangeS}/>
                        <label for="teacher">선생</label>
                    </span>
            }else{
                isStudent=
                    <span>
                        <input type="radio" id="studnet" name="isStudent" value="학생" onChange={this.handleChangeS}/>
                        <label for="student">학생</label>
                        <input type="radio" id="teacher" name="isStudent" value="선생" defaultChecked onChange={this.handleChangeS}/>
                        <label for="teacher">선생</label>
                    </span>

            }
            
            info=<div>
                <table className="table">
                        <thead>
                            <tr>
                                <td style={categoryStyle}>항목</td><td>내용</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>초원</td><td><input defaultValue={info.pasture} ref={ref=>this.pasture=ref}></input></td>
                            </tr>
                            <tr>
                                <td>목장</td><td><input defaultValue={info.farm} ref={ref=>this.farm=ref}></input></td>
                            </tr>
                            <tr>
                                <td>이름</td><td><input defaultValue={info.name} ref={ref=>this.name=ref}></input></td>
                            </tr>
                            <tr>
                                <td>생일</td><td><input type="date" defaultValue={info.b_day} ref={ref=>this.b_day=ref}></input></td>
                            </tr>
                            <tr>
                                <td>학교</td><td><input defaultValue={info.school} ref={ref=>this.school=ref}></input></td>
                            </tr>
                            <tr>
                                <td>학년/년차</td><td><input defaultValue={info.year} ref={ref=>this.year=ref}></input></td>
                            </tr>
                            <tr>
                                <td>지역</td><td><input defaultValue={info.area} ref={ref=>this.area=ref}></input></td>
                            </tr>
                            <tr>
                                <td>연락처</td><td><input defaultValue={info.phone} ref={ref=>this.phone=ref}></input></td>
                            </tr>
                            <tr>
                                <td>부모님 연락처</td><td><input defaultValue={info.parents_phone} ref={ref=>this.parents_phone=ref}></input></td>
                            </tr>
                            <tr>
                                <td>성별</td>
                                <td>
                                    {gender}
                                </td>
                            </tr>
                            <tr>
                                <td>학생/선생</td>
                                <td>
                                    {isStudent}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <NavLink to='/list'><button onClick={this.update}>update</button></NavLink>
                    <NavLink to='/list'><button onClick={this.expelled}>expelled</button></NavLink>
                </div>
        }

        return (
            <div>
                {info}
            </div>
        )
    }

}
export default UpdateMember;