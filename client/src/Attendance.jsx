import React, {Component} from 'react';
import axios from 'axios';
// import $ from 'jquery';
// import {} from 'jquery.cookie';


axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class Attendance extends Component{
    
    getList= async ()=>{
        console.log("get data");
        
        try{
            const result = await axios.post('http://localhost:8080/list/show', {headers});
            if(result.data.list){
                return result.data.list.map((item)=>{ 
                    return (
                        <tr>
                            <td>{item.pasture}</td><td>{item.farm}</td><td>{item.name}</td><td>{item.school}</td><td>{item.year}</td><td>{item.b_day}</td><td>{item.phone}</td><td>{item.parents_phone}</td><td></td>
                        </tr>
                        )
                    })
               
            }
        }catch(err){
            console.log(err);
            return null;
        }
    }


    render(){


        return(
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>초원</td><td>목장</td><td>이름</td><td>학교</td><td>학년/년차</td><td>생일</td><td>연락처</td><td>보호자연락처</td><td>기타</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <button>a</button>
                            {this.getList}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Attendance;