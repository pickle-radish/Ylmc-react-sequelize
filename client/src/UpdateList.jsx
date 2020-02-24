import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';


axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class UpdateList extends Component{

    state = {
        info:[],
        gender:""
    }

    delList = async()=>{
        const send_param={
            headers,
            id: this.props.location.query.id,
        }
        try{
            const result = await axios.post('http://localhost:8080/list/delList', send_param);
            if(result.data.info){
                this.setState({
                    info:result.data.info
                })
            }
        }catch(err){
            return null;
        }
    }

    search = async()=>{        
        try{
            const send_param={
                headers,
                id: this.props.location.query.id,
            }

            const result = await axios.post('http://localhost:8080/list/update', send_param);
            if(result.data.info){
                this.setState({
                    info:result.data.info
                })
            }
        }catch(err){
            return null;
        }
    }
    expelled = async () =>{
        const send_param={
            headers,
            id: this.props.location.query.id,
            expelled:true
        }
        try{
            const result = await axios.post('http://localhost:8080/list/expelled', send_param);
            if(result.data.info){
                this.setState({
                    info:result.data.info
                })
            }

        }catch(err){
            console.log(err);
            return null;
        }
    }
    submit = async ()=>{
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
        }
        try{
            const result = await axios.post('http://localhost:8080/list/submit', send_param);
            if(result.data.message){
                return result
            }
        }catch(err){
            return null;
        }
    }
    handleChange=(event)=>{
        this.setState({
          gender: event.target.value
        });
    }
    componentWillMount(){
        this.search();
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
                            <input type="radio" id="male" name="gender" value="남자" defaultChecked onChange={this.handleChange}/>
                            남자
                            <input type="radio" id="female" name="gender" value="여자" onChange={this.handleChange}/>
                            여자
                        </span>
            }else{
                gender= <span>
                            <input type="radio" id="male" name="gender" value="남자" onChange={this.handleChange}/>
                            남자
                            <input type="radio" id="female" name="gender" value="여자" defaultChecked onChange={this.handleChange}/>
                            여자
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
                        </tbody>
                    </table>
                    <NavLink to='/list'><button onClick={this.submit}>submit</button></NavLink>
                    <NavLink to='/list'><button onClick={this.expelled}>expelled</button></NavLink>
                    <NavLink to='/list'><button onClick={this.delList}>delete</button></NavLink>
                </div>
        }
        return(
            <div>
                {info}
            </div>
        )
    }
}

export default UpdateList;