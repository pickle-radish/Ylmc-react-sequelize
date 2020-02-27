import React, {Component} from 'react';
import axios from 'axios';

import {NavLink} from 'react-router-dom';

axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class Expelled extends Component{

    state = {
        list:[],
        expelled:0
    }
    
    Comeback = async (id) =>{
        const send_param={
            headers,
            id,
            expelled:false

        }
        try{
            const result = await axios.post('http://localhost:8080/list/expelled', send_param);
            if(result.data.message){
                this.setState({
                    expelled:this.state.expelled+1,
                })
                this.getList();
            }

        }catch(err){
            console.log(err);
            return null;
        }
    }

    getList = async ()=>{
        try{
            const result = await axios.post('http://localhost:8080/list/expelledlist', {headers});
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
        let list = this.state.list.map((item)=>{ 
            let b_day = item.b_day.split("-");
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
                    <td><button onClick={this.Comeback.bind(null, item.id)}>복귀</button></td>
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

export default Expelled;