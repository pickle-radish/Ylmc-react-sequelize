import React, {Component} from 'react';
import axios from 'axios';

import {NavLink} from 'react-router-dom';

axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class NewFriend extends Component{

    state = {
        list:[],
    }
    
    register = async (id) =>{
        const send_param={
            headers,
            id,
            newFriend:false
        }
        try{
            const result = await axios.post('http://localhost:8080/list/register', send_param);
            if(result.data.message){
                this.getList();
            }

        }catch(err){
            return null;
        }
    }

    getList = async ()=>{
        try{
            const result = await axios.post('http://localhost:8080/list/newList', {headers});
            if(result.data.list){
                this.setState({
                    list:result.data.list
                })
                return true;
            }
        }catch(err){
            return null;
        }
    }

    componentWillMount(){
        this.getList();
    }


    render(){
        let list = this.state.list.map((item)=>{ 
            let b_day=""
            if(item.b_day){
                b_day = item.b_day.split("-");
            }
            return (
                <tr key={item.id}>
                    <td>{item.pasture}</td>
                    <td>{item.farm}</td>
                    <td><NavLink to={{pathname:'/update', query:{id:item.id}}}>{item.name}</NavLink></td>
                    <td>{item.school}</td>
                    <td>{item.year}</td>
                    <td>{b_day[1]}-{b_day[2]}</td>
                    <td>{item.phone}</td>
                    <td>{item.parents_phone}</td>
                    <td><button onClick={this.register.bind(null, item.id)}>등반</button></td>
                </tr>
            )
        })

        return(
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>초원</td><td>목장</td><td>이름</td><td>학교</td><td>학년/년차</td><td>생일</td><td>연락처</td><td>보호자연락처</td><td>기타</td>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default NewFriend;