import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';


import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


axios.defaults.withCredentials = true;
const headers={withCredentials:true};


class ShowGraph extends Component{
    state={
        daysList:[],
        AttList:[],
    }
    


    getList = async () =>{
        
        try{
            const result = await axios.post('http://localhost:8080/attendance/show', {headers});
            if(result.data.daysList){
                this.setState({
                    daysList:result.data.daysList,
                    AttList:result.data.AttList,
                })
            }
        }catch(err){
            console.log(err);
        }
    }
    
   
    componentWillMount(){
        this.getList();
    }
    
    
    render(){
        const attendanceStyle={
            width:500,
        }

        const data=[]
        

        let list=this.state.daysList.map((item,index)=>{
            const day = item.attendance_day.split("-");
            const list = this.state.AttList[index].length;
            let newFriends = this.state.AttList[index].filter((item)=>{
                return item.newFriend===true;
            })
            data.push({name: `${day[1]}-${day[2]}`, 출석: list, 새친구:newFriends.length})

            return <tr><td><NavLink to={{pathname:'/editAtt', query:{id:item.id}}}>{item.attendance_day}</NavLink></td><td>{this.state.AttList[index].length}</td></tr>
        })

        

        const renderLineChart = (
            <LineChart width={1000} height={500} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="출석" stroke="#8884d8" />
                <Line type="monotone" dataKey="새친구" stroke="#82ca9d" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        );
        
        return(
            <div>
                
                {renderLineChart}

                <table className="table" style={attendanceStyle}>
                    <thead>
                        <tr>
                            <td>날짜</td><td>출석인원</td>
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

export default ShowGraph;