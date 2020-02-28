import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class NewMember extends Component{    
    state = {
        gender:"",
        isStudent:""
    }

    submit = async ()=>{
        const send_param={
            headers,
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
        try{
            const result = await axios.post('http://localhost:8080/list/new', send_param);
            if(result.data.message){
                alert("추가 되었습니다");
                return null
            }
        }catch(err){
            alert("추가 실패");
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

    render(){

        const categoryStyle={
            width:200,
        }

        let info =
            <div>
                <table className="table">
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={categoryStyle}>초원</td><td><input ref={ref=>this.pasture=ref}></input></td>
                        </tr>
                        <tr>
                            <td>목장</td><td><input ref={ref=>this.farm=ref}></input></td>
                        </tr>
                        <tr>
                            <td>이름</td><td><input  ref={ref=>this.name=ref}></input></td>
                        </tr>
                        <tr>
                            <td>생일</td><td><input type="date" ref={ref=>this.b_day=ref}></input></td>
                        </tr>
                        <tr>
                            <td>학교</td><td><input ref={ref=>this.school=ref}></input></td>
                        </tr>
                        <tr>
                            <td>학년/년차</td><td><input ref={ref=>this.year=ref}></input></td>
                        </tr>
                        <tr>
                            <td>지역</td><td><input ref={ref=>this.area=ref}></input></td>
                        </tr>
                        <tr>
                            <td>연락처</td><td><input ref={ref=>this.phone=ref}></input></td>
                        </tr>
                        <tr>
                            <td>부모님 연락처</td><td><input ref={ref=>this.parents_phone=ref}></input></td>
                        </tr>
                        <tr>
                            <td>성별</td>
                            <td>
                                <input type="radio" id="male" name="gender" value="남자" onChange={this.handleChangeG}/>
                                <label for="male">남자</label>
                                <input type="radio" id="female" name="gender" value="여자" onChange={this.handleChangeG}/>
                                <label for="female">여자</label>
                            </td>
                        </tr>
                        <tr>
                            <td>학생/선생</td>
                            <td>
                                <input type="radio" id="studnet" name="isStudent" value="학생" onChange={this.handleChangeS}/>
                                <label for="student">학생</label>
                                <input type="radio" id="teacher" name="isStudent" value="선생" onChange={this.handleChangeS}/>
                                <label for="teacher">선생</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <NavLink to='/list'><button onClick={this.submit}>submit</button></NavLink>
            </div>

        return (
            <div>
                {info}
            </div>
        )
    }

}
export default NewMember;