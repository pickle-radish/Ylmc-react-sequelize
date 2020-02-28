import React, {Component} from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

import {NavLink} from 'react-router-dom';

axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class ShowGraph extends Component {
    state={
        daysList:[],
        AttList:[],
    }

    getAttendance = async()=>{
        try{
            const result = await axios.post('http://localhost:8080/attendance/showgraph', {headers})
            if(result.data.message){
                this.setState({
                    daysList:result.data.daysList,
                    AttList:result.data.AttList,
                })
            }else{ 
                alert('데이터를 가져오지 못했습니다');
            }
        }catch(err){
            alert('에러');
        }
    }

    componentWillMount(){
        this.getAttendance();
    }

    render(){
        const categoryStyle={
            width:500,
        }
        const data = [
            ['날짜', '전체인원', '새친구']
        ]
        let list = this.state.daysList.map((item, index)=>{
            const day = item.attendance_day.split("-");
            const total = this.state.AttList[index].length;
            const newFriends = this.state.AttList[index].filter((value)=>{
                return value.newFriend===true;
            })
            data.push([`${day[1]}-${day[2]}`, total, newFriends.length])

            return (
                <tr key={item.id}>
                    <td><NavLink to={{pathname:'/editAtt', query:{id:item.id}}}>{item.attendance_day}</NavLink></td>
                    <td>{total}</td>
                </tr>
            )
        })
        return (
            <div>
                <Chart
                    width={'1000px'}
                    height={'500px'}
                    chartType="Line"
                    loader={<div>Loading Chart</div>}
                    data={data}
                    options={{
                        chart: {
                            title: '아동부 주별 출석 현황',
                        },
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
                <br></br>
                <br></br>

                <table style={categoryStyle} className="table">
                    <thead>
                        <tr>
                            <td>날짜</td>
                            <td>출석인원</td>
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