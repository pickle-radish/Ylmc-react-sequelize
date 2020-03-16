import React, {Component} from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class Home extends Component{  
    state={
        login:false,
    }

    login = async () => {
        try{
            const send_param={
                headers,
                id:this.id.value,
                password:this.password.value,
            }
            const result = await axios.post(process.env.REACT_APP_REQ_ADDRESS+'/manager/login', send_param);
            if(result.data.login){
                sessionStorage.setItem('login', true);
                this.setState({
                    login:true,
                })
                window.location.reload();
                alert("로그인 되었습니다");
                return null
            }else{
                alert("아이디와 비밀번호를 확인해 주세요");
            }
        }catch(err){
            return null;
        }
    }

    logout = async () => {
        try{
            const result = await axios.post(process.env.REACT_APP_REQ_ADDRESS+'/manager/logout', {headers});
            if(result.data.logout){
                sessionStorage.removeItem('login');
                this.setState({
                    login:false,
                })
                window.location.reload();
                alert('로그아웃 되었습니다');
            }else{
                alert('로그아웃 실패');
            }
        }catch(err){
            return null;
        }
    }

    render(){
        let mainPage;
        if(sessionStorage.getItem('login')===null){
            mainPage=
                <div>
                관리자 로그인<br/>
                ID:<input type='text' ref={ref=>this.id=ref}></input><br/>
                PW:<input type="password" ref={ref=>this.password=ref}></input><br/>
                <button onClick={this.login}>로그인</button>
            </div>
        }else{
            mainPage=
                <div>
                    <button onClick={this.logout}>로그아웃</button>
                </div>
        }

        return(
            <div>
                {mainPage}
            </div>
        )
    }
}

export default Home;
