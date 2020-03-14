## Create project folder

1. project폴더 생성 
2. create-react-app client 를 프로젝트 경로에서 입력해서 client  프로젝트를 생성한다
3. 위의 프로젝트가 만들어지는 동안 server 프로젝트를 만든다



### server 세팅



1. server라는 폴더를  client 폴더처럼 project폴더 바로 밑에 만들어 준다
2. server안에서 npm init 실행하고 명령문이 끝날 때 까지 계속 해서 엔터
3. package.json 파일이 만들어지면 "scripts" 안에 "test"처럼 다음과 같이 입력한다

```json
"scripts": {
    "start": "nodemon server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

7.  계속해서 server.js파일을 생성한다
8. 서버부분을 사용하기 위해서 express를 `npm i express` 를 cmd창에서 명령어로 입력해 설치한다
9. react는 3000번 포트 데이터베이스를 사용하기 위해 사용하는 서버는 8080포트로 설정하기 때문에 origin이 달라 그냥 사용할수 없으니 cors정책을 이용하기 위해 cors도 설치한다 `npm i --save cors`
10. cosr까지 설치가 다 되었으면 server.js파일을 수정하고 서버를 실행시켜본다

```js
const express=require('express');
const app=express();
const cors=require('cors');


const corsOptions = {
    origin: true, //동일 출처 정책을 사용하겠다. 원래는 3000번 포트만 통신 가능이지만 8080과도 통신 가능하게 하겠다
    credentials: true //신임장
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(8080, ()=>{
    console.log("8080 server ready...");
})
    
```



7. 실행이 정상적으로 잘 작동되면 이제 데이터베이스를 사용할 준비를 한다 데이터베이스는 sequelize를 통해  mysql을 사용하기 위해서 `npm i sequelize mysql2` 와
   `npm i -g sequelize-cli` 를 설치한다 
8. 설치가 다 되었으면 server경로 안에서 `sequelize init`으로 sequelize를 사용할 파일들을 생성한다
9. 만들어진 파일중에  config 폴더 밑에 config.json 파일에 들어가서 username과 password, database, host, port 를 세팅해준다 

```json
 "development": {
    "username": "root",		//database에서 사용하는 username
    "password": "mysql",	//database에서 사용하는 password
    "database": "Ylmc_edu_dept",	//database name
    "host": "127.0.0.1",	// ip주소 = localhost
    "port": "3307",			//mysql에서 사용하고 있는 포트번호
    "dialect": "mysql",
    "operatorsAliases": false
  },
```



7. models 파일안에 index.js 파일의 내용을 다 지우고 다음과 같이 수정한다

```js
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

13. 이제 데이터베이스에서 사용할 테이블을 정의할 파일들을 만든다 만들 파일은 member.js 파일과 days.js 파일이다
14. member.js 파일의 내용은 다음과 같다

```js
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('member', {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      b_day: {
        type: DataTypes.DATEONLY,
      },
      pasture: {
        type: DataTypes.STRING(45),
      },
      farm: {
        type: DataTypes.STRING(45),
      },
      school: {
        type: DataTypes.STRING(45),
      },
      year: {
        type: DataTypes.INTEGER,
      },
      area: {
        type: DataTypes.STRING(45),
      },
      phone: {
        type: DataTypes.STRING(13),
      },
      parents_phone: {
        type: DataTypes.STRING(13),
      },
      gender: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isStudent: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      expelled:{
          type: DataTypes.BOOLEAN,
          defaultValue: false,
      },
      newFriend:{
          type: DataTypes.BOOLEAN,
          defaultValue: true,
      },
    }, {
      tableName: 'member',
      charset: 'utf8',
      collate: 'utf8_general_ci', 
      timestamps:false,
    });
  };
  
```

15.  days.js 파일의 내용은 다음과 같다

```js
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('days', {
      attendance_day: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        unique: true
      }
    }, {
      tableName: 'days',
      timestamps:false,
    });
  };
```

16. 테이블에 대한 정의를 다 했으면 테이블간의 관계를 정의해준다 해당 내용은 index.js파일에 한다

```js
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Member=require('./member')(sequelize,Sequelize);  //
db.Days=require('./days')(sequelize,Sequelize);

db.Member.belongsToMany(db.Days, {through: 'Attendance'});
db.Days.belongsToMany(db.Member, {through: 'Attendance'});

module.exports = db;
```



18. server.js 에 sequelize를 사용하기 위해 다음과 같이 코드를 추가한다 

```js
const express=require('express');
const app=express();
const cors=require('cors');

const sequelize=require('./models').sequelize;
sequelize.sync();


const corsOptions = {
    origin: true,
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(8080, ()=>{
    console.log("8080 server ready...");
})
    
```



18. 저장하고 `npm start`로 실행하면 이제 데이터베이스에 테이블이 생겼는지 확인한다



### client 세팅

1. create-react-app 으로 만들어진 client파일중 src밑의 파일을 다 지워준다
2. 마찬가지로 public 파일 밑에 있는 파일들을  favicon.ico만 남기고 다 지운다 (favicon.ico 이 없으면 브라우저에 console부분에 계속 warning이 뜬다)
3. public폴더 밑에 index.html파일을 생성 다음과 같이 코드를 작성한다

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Attendance</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</head>
<body>
    <div class="container" id="container">

    </div>
</body>
</html>
```

4. 다음으로 src폴더 밑에 index.jsx파일을 생성하고 다음과 같이 코드를 작성한다

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import MainPage from './MainPage';
import './Main.css';

ReactDOM.render(
    <div>Hello React!</div>,
    document.querySelector("#container")
)
```

5. 이제 저장하고 npm start로 실행하고 브라우저에서 localhost:3000 주소로 접속한다





### 메인페이지

1. 메인 페이지에서 bootstrap을 이용하기 위해서 먼저 `npm i react-bootstrap` 으로 react에서 사용하기 위한 bootstrap을 설치한다
2. 이제 MainPage.js파일을 만들고 다음과 같이 코딩한다

```jsx
import React, {Component} from 'react';

class MainPage extends Component{

    render(){
        return (
            <div>
                Main Page
            </div>
        )
    }
}
export default MainPage;
```

3. index.jsx 파일에서 MainPage 컴포넌트를 호출한다

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import MainPage from './MainPage';  //추가

ReactDOM.render(
    <MainPage />,     //MainPage 컴포넌트 호출
    document.querySelector("#container")
)
```

4. 브라우저에서 Hello React! 에서 Main Page로 바뀐것을 확인했으면 이제 MainPage를 수정한다
5. 먼저 부트스트랩중 네비게이션 바를 사용하기 위해서 다음 항목들을 MainPage.jsx 윗부분에 추가한다

```jsx
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
```

6. 그리고 추가한 bootstrap 컴포넌트를 사용해서 네비게이션 바를 다음과 같이 만든다

```jsx
<Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">Ylmc</Navbar.Brand>
	<Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="List" id="basic-nav-dropdown">
                
            </NavDropdown>
            <NavDropdown title="Attendance" id="basic-nav-dropdown">
              
            </NavDropdown>
		</Nav>
	</Navbar.Collapse>
</Navbar>
```

7. 항목은 크게 2가지로 전체 명단을 관리하는 항목과 출석을 관리하는 항목으로 나눈다
8. List의 항목으로는 전체 명단 보기, 명단 추가, 새롭게 추가된 명단, 제외된 명단으로 나누고 각 기능을 LIst의 드롭다운으로 만들어준다
9. Attendance는 전체 그래프 보기, 오늘의 출석 올리기 2가지이다

```jsx
<Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">Ylmc</Navbar.Brand>
	<Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="List" id="basic-nav-dropdown">
                <NavDropdown.Item >Show List</NavDropdown.Item>
                <NavDropdown.Item >New Member</NavDropdown.Item>
                <NavDropdown.Item >New Friend</NavDropdown.Item>
                <NavDropdown.Item >Expelled List</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Attendance" id="basic-nav-dropdown">
                <NavDropdown.Item >Show Attendance</NavDropdown.Item>
                <NavDropdown.Item >Today Attendance</NavDropdown.Item>
            </NavDropdown>
		</Nav>
	</Navbar.Collapse>
</Navbar>
```



### React Router



1. 이 프로젝트는 SPA로 만들 것이기 때문에 React의 router기능을 이용해서 지금부터 링크를 만들 것이다
   가장 먼저 컴포넌트를 네비게이션 바 부분과 네비게이션 아래에 컨텐츠가 보여질 부분으로 나눠서 Navigation.jsx 파일과 Content.jsx파일을 만든다

2. Navigation.jsx파일은 다음과 같이 코딩한다

```jsx
import React, {Component} from 'react';

import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';

class Navigation extends Component{
    render(){
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Ylmc</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <NavDropdown title="List" id="basic-nav-dropdown">
                                <NavDropdown.Item >Show List</NavDropdown.Item>
                                <NavDropdown.Item >New Member</NavDropdown.Item>
                                <NavDropdown.Item >New Friend</NavDropdown.Item>
                                <NavDropdown.Item >Expelled List</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Attendance" id="basic-nav-dropdown">
                                <NavDropdown.Item >Show Attendance</NavDropdown.Item>
                                <NavDropdown.Item >Today Attendance</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
export default Navigation;
```

3. Content.jsx는 일단 에러가 나지 않게 빈 div태그를 반환하게 해준다

```jsx
import React, {Component} from 'react';

class Content extends Component {   
    render(){
        return (
            <div></div>
        )
    }
}
export default Content;
```

4. MainPage.jsx는 import시켰던 bootstrap을 지우고 return 부분도 다음과 같이 수정해준다

```jsx
import React, {Component} from 'react';

import Navigation from './Navigation';
import Content from './Content';

class MainPage extends Component{
    render(){
        return (
            <div>
                <Navigation />
                <Content/>
            </div>
        )
    }
}
export default MainPage;
```

5. 이제 react router를 사용하기 위해서 `npm i react-router-dom`명령어로  react-router-dom을 설치한다

6. 설치가 다 됬으면 네비게이션 바에서 NavLink와 HashRouter를 react-router-dom 에서 import시킨다

7. 그리고 드롭다운의 각 항목에 NavLink로 경로를 정해준다 이때 브라우저에서 계속해서 warning이 뜨는데 
   a태그 안에 a태그가 있다는 경고문이니 일단은 무시한다

```jsx
<Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">Ylmc</Navbar.Brand>
	<Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
			<HashRouter>
                <NavDropdown title="List" id="basic-nav-dropdown">
                    <NavDropdown.Item >
                        <NavLink to="/list">Show List</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item >
                        <NavLink to="/newmember">New Member</NavLink>						   				</NavDropdown.Item>
                    <NavDropdown.Item >
                        <NavLink to="/newList">New Friend</NavLink>   										</NavDropdown.Item>
                    <NavDropdown.Item >
                        <NavLink to="/expelledMember">Expelled List</NavLink>								</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Attendance" id="basic-nav-dropdown">
                    <NavDropdown.Item >
                        <NavLink to="/showgraph">Show Attendance</NavLink>									</NavDropdown.Item>
                    <NavDropdown.Item >
                        <NavLink to="/todayAttendance">Today Attendance</NavLink>							</NavDropdown.Item>
                </NavDropdown>
			<HashRouter>
		</Nav>
	</Navbar.Collapse>
</Navbar>
```

8. Content.jsx에서는 Navigation에서 NavLink 경로에 맞게 Route를 하나씩 설정해주는데 가장먼저 ShowList를 하나 만든다 Route도 NavLink와 마찬가지로 HashRouter태그 안에 있어야 한다

```jsx
import React, {Component} from 'react';
import {Route, HashRouter} from 'react-router-dom';
import ShowList from './ShowList';

class Content extends Component {
    render(){
        return (
            <div id="content">
                <HashRouter>
                    <Route exact path='/' />
                    <Route path='/list' component={ShowList} />
                </HashRouter>
            </div>
        )
    }
}
export default Content;
```

9. Show List를 보여주기 위해서는 ShowList.jsx파일을 만들어야 한다 ShowLIst.jsx파일은 다른 jxs파일과 만드는 방식은 동일하다

```jsx
import React, {Component} from 'react';

class ShowList extends Component{
    render(){
        return(
            <div>Show List</div>
        )
    }
}
export default ShowList;
```



### Database에서 명단 가져오기

1. ShowLIst페이지를 로딩했을 때 바로 명단을 보여주기 위해서는 react생명주기 메소드를 사용해서 react가 render하기 전에 데이터베이스에서 데이터를 가져오기 위해서 componentWillMount()메소드를 오버라이딩 해서 데이터를 받아온다
2. componentWillMount에서는 getList함수를 호출한다

```js
componentWillMount(){
    this.getList();
}
```

3. 먼저 getList함수에서 받아올 데이터를 저장할 state에  list변수를 선언한다 선언은 클래스 안쪽 맨 위에 한다

```js
state={
	list:[]
}
```

4. 서버에 연결할 때 사용하는 방식은 axios 함수를 사용한다 해당 함수를 사용하기 위해서는 
   `npm i axios` 로 axios를 설치한다 
5. axios를 설치하고 난 뒤에는 cors을 사용하기 위한 선언을 해준다 

```js
axios.defaults.withCredentials = true;
const headers={withCredentials:true};
```

6. 선언한 headers는 앞으로 데이터베이스 서버와 연결할 때 마다 넘겨주는 파라미터 값에 계속해서 포함된다

7. getList함수는 먼저 연결이 잘 됬는지 확인하기 위해 다음과 같이 정의한다

```jsx
getList = async ()=>{
    try{                                 //서버의 주소         //라우팅 경로 
        const result = await axios.post('http://localhost:8080/list/show',{headers});
        if(result.data.list){
        	alert(result.data.list); 
    	}
    }catch(err){
        return null;
    }
}
```

8. 이제 server에 가서 데이터를 받아오는 작업을 한다 먼저 routes폴더를 만들고 listRouter.js를 만들고 다음과 같이 코딩한다

```js
const express=require('express');
const router=express.Router();

const Member=require('../models').Member;

router.post('/show', (req,res)=>{
    res.json({list:"연결 성공"})
})

module.exports=router;
```

9. listRouter.js 작성을 완료했으면 server.js에 가서 다음 코드를 추가해 라우팅 설정을 해준다

`app.use('/list', require('./routes/listRouter'));`

10. 데이터베이스에 데이터를 가져오기 위해서 먼저 데이터베이스에 member테이블의 데이터를 넣어준다

```mysql
insert into member (name, b_day, pasture, farm, school, year, area, phone, parents_phone, gender) values ('임수민', '2010-6-18', '구원', '동티모르', '송양', 4, '', '010-5422-1536', '010-3745-3744', true);
insert into member (name, b_day, pasture, farm, school, year, area, phone, parents_phone, gender) values ('이주찬', '2008-3-22', '구원', '알바니아', '옥정', 6, '옥정', '010-1111-2222', '010-3335-5531', false);
```

11. 데이터를 다 넣었으면 sequelize를 이용해서 데이터베이스에서 데이터를 가져온다 sequelize를 사용할 때에는  try catch문을 사용해서 에러처리를 따로 해준다 데이터의 정렬 순서는 초원, 목장,학생/선생 이다

```js
router.post('/show', async (req,res)=>{
    try{
        const list = await Member.findAll({
            order:[['pasture', 'asc'], ['farm', 'asc'], ['isStudent', 'desc']]
        })
        res.json({list});
    }catch(err){
        console.log(err);
        res.json({list:false});
    }
})
```

12. 다시 client쪽 ShowList.jsx에 가서 받아온 데이터를 state의 list변수에 저장한다
    getList의 함수 안에 `alert(result.data.list); `부분을 다음 코드로 바꿔준다

```jsx
this.setState({
    list:result.data.list,
})
```

13. 받아온 데이터는 테이블 형테로 보여준다 테이블은 다음과 같이 만든다

```jsx
<div>
	<table className="table">
    	<thead>
        	<tr>
            	<td>초원</td>
                <td>목장</td>
                <td>이름</td>
                <td>학교</td>
                <td>학년/년차</td>
                <td>생일</td>
                <td>연락처</td>
                <td>보호자연락처</td>
                <td>기타</td>
            </tr>
        </thead>    
        <tbody>
        </tbody>
	</table>
</div>
```

14. state 에 저장한 list값은 map함수를 이용해 테이블 형태의 jsx형태로 바꿔준다
    생일은 년도를 빼고 월/일만 표시하게끔 처리해준다

```jsx
let list = this.state.list.map((item)=>{
    let b_day=""
    if(item.b_day){
	    b_day = item.b_day.split("-");
    }   
    return (
    	<tr key={item.id}>
    		<td>{item.pasture}</td>
	    	<td>{item.farm}</td>
    		<td>{item.name}</td>
	    	<td>{item.school}</td>
    		<td>{item.year}</td>
	  		<td>{b_day[1]}-{b_day[2]}</td>
			<td>{item.phone}</td>
			<td>{item.parents_phone}</td>
			<td></td>
		</tr>
	)
})
```

15. 이제 tbody태그 안에 list변수를 호출한다

```jsx
<div>
	<table className="table">
    	<thead>
        	<tr>
            	<td>초원</td>
                <td>목장</td>
                <td>이름</td>
                <td>학교</td>
                <td>학년/년차</td>
                <td>생일</td>
                <td>연락처</td>
                <td>보호자연락처</td>
                <td>기타</td>
            </tr>
        </thead>    
        <tbody>
        	{list}
        </tbody>
	</table>
</div>
```



### 새친구 등록하기

1. 데이터베이스에서 직접 데이터를 추가 하지 않고 브라우저에서 정보를 입력 받아 데이터베이스에 추가하기 위해서 NewMember.jsx.파일을 생성한다 Content.jsx파일에  헤더부분에서 NewMember를 포함시키고  ShowList component밑에 newMember경로를 추가해준다 

```jsx
import ShowList from './ShowList';
import NewMember from './NewMember';
```



```jsx
<Route path="/list" component={ShowList} />
<Route path="/newmember" component={NewMember} />
```

2. NewMember.jsx는 다음과 같이 작성하는데 submit버튼을 눌렀을 시 showlist페이지로 갈 수 있게 헤더부분에 NavLink를 import하고 사용한다

```jsx
import {NavLink} from 'react-router-dom'
```



```jsx
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
```

3. 헤더부분에는 다음과 같은 항목들을 import시킨다

```jsx
import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

axios.defaults.withCredentials = true;
const headers={withCredentials:true};
```

4. 저장하고 잘 실행되는지 확인하고 이제 값을 받기 위해서 먼저 라디오 버튼의 값을 저장할 state변수를 선언하고 라디오버튼의 이벤트 핸들러 메소드를 정의한다

```jsx
state = {
    gender:"",
    isStudent:""
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
```

5. 다른 값들은 원래 input태그에서 text를 받던 방식을 사용해서 값을 받아와 send_param에 저장해서 서버로 보낸다

```jsx
submit = async ()=>{
    try{
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
        const result = await axios.post('http://localhost:8080/list/new', send_param);
        if(result.data.message){
            return result
        }
    }catch(err){
        alert("추가 실패");
        return null;
    }
}
```

6. 이제 server에서 값을 받아서 데이터베이스에 저장한다 ListRouter.js파일에 /new 경로를 정의한다 
   라디오 버튼에 대한 값을 따로 처리해주고 날짜인 b_day 와 year도 null일 경우를 따로 처리해준다
   그리고 전달 받은 값을 테이블 컬럼에 맞춰서 sequelize를 이용해 데이터베이스에 저장한다

```js
router.post('/new', async (req,res)=>{
    try{
        let gender=false
        if(req.body.gender==="남자"){
            gender=true;
        }
        let isStudent=false
        if(req.body.isStudent==="학생"){
            gender=true;
        }
        let b_day;
        if(!req.body.b_day){
            b_day = null
        }else{
            b_day = req.body.b_day
        }
        let year
        if(!req.body.year){
            year = null;
        }else{
            year = req.body.year;
        }
        
        const result = await Member.create({
            pasture:req.body.pasture,
            farm:req.body.farm,
            name:req.body.name,
            b_day:b_day,
            school:req.body.school,
            year:year,
            area:req.body.area,
            phone:req.body.phone,
            parents_phone:req.body.parents_phone,
            gender,
            isStudent,
        });
        res.json({message:true});
    } catch(err){
        console.log(err);
        res.json({message:false});
    }
})
```



### 새친구 목록

1. 지금까지 데이터를 넣을때 member테이블에서 newFriend 항목은 defautl값을 true로 줬기 때문에 새로 입력된 데이터의 newFriend값은 다 true이다 이 항목을 이용해서 ShowList 에서 보여줄 데이터와  새친구 목록의 데이터를 구분지어서 보여준다
2. 새친구 등록 페이지를 만들었던 것 처럼 Content.jsx에서 NewFriends에 대한 경로를 추가하고 NewFriends.jsx파일도 만들어준다 

```jsx
import React, {Component} from 'react';

class NewFriends extends Component{
    render(){
        return (
            <div>
                new friends
            </div>
        )
    }
}
export default NewFriends;
```

3. 저장하고 브라우저에서 newFriends 항목을 눌렀을 때 new friends라는 문구가 잘 뜨는지 확인한다
4. NewFriends는 ShowList 와 구성의 거의 비슷하다 한가지 차이점이라면 데이터베이스를 조회할 때 newFriend항목이 true인 데이터만 찾아온다 ShowList 의 내용를 복사해서 NewFriends에 붙여넣기 하고 클래스 이름과 export 부분의 이름을 잘 바꿔준다
   getList함수에서 서버로 가는 경로를 /list/show 에서 /list/newList로 바꿔준다
   그리고 일정 기간이 지나면 newFriend의 값을 false로 바꿀 수 있게 등반 버튼을 만들어준다

```jsx
import React, {Component} from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
const headers={withCredentials:true};


class NewFriends extends Component{
    state={
        list:[],
    }
    getList = async () => {
        try{
            const result = await axios.post('http://localhost:8080/list/newList', {headers});
            if(result.data.list){
                this.setState({
                    list:result.data.list,
                })
            }
        }catch(err){
            console.log(err);
            alert('목록을 불러올 수 없습니다');
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
                    <td>{item.name}</td>
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
                            <td>초원</td>
                            <td>목장</td>
                            <td>이름</td>
                            <td>학교</td>
                            <td>학년/년차</td>
                            <td>생일</td>
                            <td>연락처</td>
                            <td>보호자연락처</td>
                            <td>기타</td>    
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
export default NewFriends;
```

5. 서버로가서 newFriend항목이 true인 데이터들을 넘겨준다

```jsx
router.post('/newList', async (req,res)=>{
    try{
        const list = await Member.findAll({
            where: {newFriend:true}
        },{
            order:[['pasture', 'asc'], ['farm', 'asc']]
        },)
        res.json({list});
    }catch(err){
        console.log(err);
        res.json({list:"error"});
    }
})
```

6. 브라우저에서 값이 잘 넘어왔는지 확인하고 이제 등반버튼을 눌렀을시 호출되는 함수를 정의한다

```jsx
register = async (id) =>{
    const send_param={
        headers,
        id,
    }
    try{
        const result = await axios.post('http://localhost:8080/list/register', send_param);
        if(result.data.message){
            alert(result.data.message);
            this.getList();
        }

    }catch(err){
        return null;
    }
}
```

7. 다시 server로 가서 listRouter에 register경로를 추가하고 sequelize를 이용해서 데이터베이스에 newFriend의 값을 변경한다

```js
router.post('/register', async (req,res)=>{
    try{
        await Member.update({
            newFriend:false,
        },{
            where:{id:req.body.id}
        })
        res.json({message:"등반되었습니다"});

    }catch(err){
        console.log(err);
        res.json({message:false});
    }
})
```

8. 그럼이제 ShowList에서는 새친구들을 안보이게 데이터를 받아오기 위해서 server에 /list/show 경로에서 데이터 쿼리문을 수정한다

```js
router.post('/show', async (req,res)=>{
    try{
        const list = await Member.findAll({
            where: {newFriend:false}, 
            order:[['pasture', 'asc'], ['farm', 'asc'], ['isStudent', 'desc']]
        })
        res.json({list});
    }catch(err){
        console.log(err);
        res.json({list:false});
    }
})

```

9. ShowList에 아무도 뜨지 않는 것을 확인한 후에 newFriends에서 등반을 시킨후 명단이 새로고침 되고 ShowList로 다시 가서 방금 등반한 인원을 확인한다



### 정보 수정

1. 정보 수정 페이지는 List의 항목에는 없지만 List에서 명단을 볼 때 이름을 클릭하면 정보를 수정하는 페이지로 들어가게끔 라우팅 한다 정보를 수정하는 페이지는 새친구를 등록하는 페이지와 구성이 동일함으로 NewMember.jsx를 복사해서 UpdateMember.jsx를 만들어준다

2. 이름을 클릭해서 페이지 이동을 할 떄에는 id 값도 넘겨 줘야 하기 때문에 NavLink를 사용해서 페이지 이동할 때 id값도 같이 넘겨준다 ShowList에서 list를 map함수로 바꿔주는 부분에서 {item.name}을 다음과 같이 수정한다

```jsx
<td><NavLink to={{pathname:'/update', query:{id:item.id}}}>{item.name}</NavLink></td>
```

3. Content.jsx에서 UpdateMember를 import시켜준 뒤에  /update 에 대한 경로를 추가해준다

```jsx
import ShowList from './ShowList';
import NewMember from './NewMember';
import NewFriends from './NewFriends';
import UpdateMember from './UpdateMember';
```



```jsx
<Route exact path='/' />
<Route path='/list' component={ShowList} />
<Route path='/newmember' component={NewMember} />
<Route path='/newList' component={NewFriends} />
<Route path='/update' component={UpdateMember} />
```

4. UpdateMember.jsx에서는 render하기 전에 componentWillMount() 함수로 데이터베이스에서 해당 인원의 정보를 받아와서 state값의 info에 저장한다 먼저 state에 info를 정의한다

```jsx
state = {
    gender:"",
    isStudent:"",
    info:[],
}
```



5. componentWillMount메소드에서 호출하는getInfo는 다음과 같이 정의한다

```jsx
getInfo = async()=>{
    try{
        const send_param={
            headers,
            id: this.props.location.query.id,
        }
        const result=await axios.post('http://localhost:8080/list/getInfo', send_param);
        if(result.data.info){
            this.setState({
                info:result.data.info
            })
        }
    }catch(err){
        return null;
    }
}
```

5. server에서는 /list/getInfo 에서 해당 아이디의 데이터를 넘겨준다

```js
router.post('/getInfo', async (req,res)=>{
    try{
        const result = await Member.findOne({
            where:{id:req.body.id}
        })
        res.json({info:result});
    }catch(err){
        console.log(err);
        res.json({info:false})
    }
})
```

6. UpdateMember.jsx에서는 넘겨받은 값을 가지고 render부분에서 정의 되있는info에 input태그 안에 값을 다음과 같은 방식으로 넣어준다
7. 먼저 state값에 있는 데이터를 꺼내서 info에 저장한다
8. 그 중에서 성별과 학생/선생에 대한 데이터를 가지고 라디오버튼으로 처리해준다
9. 나머지는 input태그 안에서 defaultValue를 사용해서 값을 집어넣어준다
10. 테이블 밑에는 update, expelled 버튼을 만들어준다
11. 버튼을 만들 때는 ShowList로 바로 갈수 있게끔 NavLink를 사용해서 라우팅한다

```jsx
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
            <NavLink to='/list'><button onClick={this.update}>update</button></NavLink>
            <NavLink to='/list'><button onClick={this.expelled}>expelled</button></NavLink>
            
        </div>
}
```

12 .update버튼을 누르면 호출 되는update함수는 기존의 submit함수의 이름만 update로 바꿔서 사용한다

13. 값을 넘겨받는 건 그대로 사용하고 axios의 경로만 /list/update로 바꿔주고  send_param에서 id의 값도 추가해준다
14. server로 가서 /list/update 경로에서 sequelize를 사용해 데이터를 update한다

```js
router.post('/update', async (req,res)=>{
    console.log(req.body.id);
    try{
        let gender=false
        if(req.body.gender==="남자"){
            gender=true;
        }
        let isStudent=true
        if(req.body.gender==='선생'){
            isStudent=false;
        }
        await Member.update({
            pasture:req.body.pasture,
            farm:req.body.farm,
            name:req.body.name,
            b_day:req.body.b_day,
            school:req.body.school,
            year:req.body.year,
            area:req.body.area,
            phone:req.body.phone,
            parents_phone:req.body.parents_phone,
            gender,
            isStudent,
        },{
            where:{id:req.body.id}
        })

        res.json({message:"수정되었습니다"})

    }catch(err){
        console.log(err);
        res.json({message:false});
    }
})

```

15. 이제 expelled버튼에 대한 처리를 해준다 id값과 expelled값을true로 보내준다

```jsx
expelled = async()=>{
    const send_param={
        headers,
        id:this.props.locaction.query.id,
        expelled:true,
    }
    try{
        const result = await axios.post('http://localhost:8080/list/expelled', send_param);
        if(result.data.message){
            alert(result.data.message);
        }else{
            alert("제적실패");
        }
    }catch(err){
        alert("제적실패");
    }
}
```

16. 서버에서는 보내준 값을 받아서 sequelize를 이용해 데이터를 수정한다

```js
router.post('/expelled', async (req,res)=>{
    try{
        await Member.update({
           expelled:req.body.expelled,
        },{
            where:{id:req.body.id}
        })
        res.json({message:"제적되었습니다"})
    }catch(err){
        console.log(err);
        res.json({message:false});
    }
})
```

17. 제적이 완료 되면 이제 ShowList에서는 제적된 인원이 뜨지 않게 ShowList 페이지에서 데이터를 가져올 때 쿼리문을 expelled:false 를 where문에 추가한다

```js
router.post('/show', async (req,res)=>{
    try{
        const list = await Member.findAll({
            where: {newFriend:false, expelled:false}, 
            order:[['pasture', 'asc'], ['farm', 'asc'], ['isStudent', 'desc']]
        })
        res.json({list});
    }catch(err){
        console.log(err);
        res.json({list:false});
    }
})
```





### 제적 명단

1. List의 제적 명단의 경우 newFriends 페이지와  동일하다 다른점은 member테이블에서 newFriend 항목 대신 expelled항목이 true인 값을 받아온다 먼저 newFriend.jsx 파일을 복사해서 expelled.jsx파일을 만들어준다
2. 클래스 이름을 ExpelledList로 바꾼다
3. getList에서 axios경로를 /list/expelledList로 바꿔준다
4. 등반 버튼을 복귀 버튼으로 바꾼 다음 register함수 이름도 comeback함수로 바꿔주고 axios경로를 /list/expelled로 바꿔준다

```jsx
import React, {Component} from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class ExpelledList extends Component{

    state = {
        list:[],
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
                this.getList();
            }
        }catch(err){
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
                    <td>{item.name}</td>
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
                            <td>초원</td>
                            <td>목장</td>
                            <td>이름</td>
                            <td>학교</td>
                            <td>학년/년차</td>
                            <td>생일</td>
                            <td>연락처</td>
                            <td>보호자연락처</td>
                            <td>기타</td>
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

export default ExpelledList;
```

6. ExpelledList.jsx를 다 작성하고 server로 가서 /list/expelledList의 처리를 해준다
   expelled의 값이 true인 값들만 찾아와서 반환해준다

```
router.post('/expelledList', async (req,res)=>{
    try{
        const list = await Member.findAll({
            where: {expelled:true}
        },{
            order:[['pasture', 'asc'], ['farm', 'asc']]
        },)
        res.json({list});
    }catch(err){
        console.log(err);
        res.json({list:"error"});
    }
})
```

7. /list/comeback에 대한 경도로 추가해서 expelledList에서 원하는 인원의 id을 받아와 expelled 값을 다시 false로 바꿔준다

```jsx
router.post('/expelled', async (req,res)=>{
    try{
        await Member.update({
           expelled:req.body.expelled,
        },{
            where:{id:req.body.id}
        })
        res.json({message:"success"})
    }catch(err){
        console.log(err);
        res.json({message:false});
    }
})
```







## 출석



### 출석하기

1. 출석 현황을 보여주기 전에 출석 기능부터 구현한다 먼저 출석을 하기 위해서는 member테이블에서 list를 불러오고 초원, 목장, 이름과 체크박스만 ui에 테이블 형태로 보여준다
2. 먼저 Today.jsx를 만들고 다음과 같이 코딩한다

 ```jsx
import React, {Component} from 'react';
import axios from 'axios';\

axios.defaults.withCredentials = true;
const headers={withCredentials:true};

class Today extends Component{

    render(){
        return(
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>초원</td>
                            <td>목장</td>
                            <td>이름</td>
                            <td>출석</td>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>

                </table>
            </div>
        )
    }
}
export default Today;
 ```

3. Content.jsx에 Today Route를 추가해주고 브라우저에서 잘 작동하는지 확인한다
4. componentWillMount에서 getList함수를 호출해서 화면을render하기 전에 member테이블의 데이터를 가져온다 출석할 때 인원은 기존 인원과 새친구들이다 기존 인원과 새친구들의 데이터는 showlist와 newfirends에서 받아온 것과 동일하니 server에 똑같은 경로로 찾아가서 받아와 주면 된다

```jsx
getList = async()=>{
    try{
        const oldList=await axios.post('http://localhost:8080/list/show', {headers});
        const newList=await axios.post('http://localhost:8080/list/newList', {headers});
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
```

5. 이제 받아온 데이터를 다른 리스트에서 했던 것 처럼 map함수를 이용해서 테이블 형태로 가공해서 불러온다

   oldList와 newList는 하는 일이 똑같음으로 함수를 만들어서 호출한다 함수는 다음과 같다

```jsx
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
```

정의한 함수를 호출한다

```jsx
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
```

6. attendanceCheck함수에서는 checkbox의 값을을 읽을 때는 jquery를 사용함으로 `npm i juqery` 명령어로 jquery를 설치하고 `import $ from 'jqery'`를 헤더에 추가해서 사용한다

```jsx
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
            alert('출석실패');
        }
    }catch(err){
        alert("에러");
    }
}
```

7. server에서 attendanceRouter.js를 만들어준다
8. server.js 에서 `app.use('/attendance', require('./routes/attendanceRouter'))` 추가
9. attendance.js에서는 Days테이블을 require해준다
10.  /attendance/checkAtt 경로에 대한 처리를 해준다
11. 가장 먼저 출석하려는 오늘 날짜에 대한 데이터가 이미 있는지 확인한다
12. 데이터가 이미 있는 경우 res.json을 사용해서 종료
13. 없는 경우 sequelize를 사용헤 데이터베이스에 데이터를 추가한다
14. 데이터를 추가할 때에는 받아온 checkAtt 배열에서 filter함수를 사용해 값이 있는 항목들만 추가한다

```js
router.post('/checkAtt', async (req,res)=>{
    try{
        const isDay = await Days.findOne({
            where:{attendance_day: Date.now()}
        })
        
        if(isDay){
            res.json({message:"오늘은 이미 출석하였습니다!"})
        }else{
            const days_result = await Days.create({
                attendance_day: Date.now()
            });

            const filter_result = req.body.checkAtt.filter((item)=>{
                if(item !== null){
                    return item;
                }
            })
            days_result.addMembers(filter_result);
        }
        res.json({message:"출석이 완료 되었습니다"});
        
    } catch(err){
        console.log(err);
        res.json({message:false});
    }
})
```





### 출석 그래프

1. 그래프를 그리기 위해서는 먼저 데이터베이스에서 출석 데이터를 가져와야 한다 마찬가지로 componentWillMount에서 데이터를 가져온다
2. 그래프에서는 날짜들과 해당 날짜에 출석한 인원들의 정보를 받아온다

```jsx
getAttendance = async()=>{
    try{
   		const result=await axios.post('http://localhost:8080/attendance/showgraph', {headers})
        if(result.data.message){
            this.setState({
                daysList:result.data.days,
                AttList:result.data.attList,
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
```

3. 서버에서는 먼저 days테이블에서 출석되어 있는 날짜들을 받아온다
4. 받아온 데이터는 join테이블인 attendance에서 데이터를 가져오기 위해 findOne 메소드의 결과물로 뽑아낸다
5. 뽑아낸 데이터를가지고 getMembers 메서드를 사용해서 출석한 인원들의 정보를 얻어온다

```jsx
router.post('/showgraph', async (req,res)=>{
    try{
        const daysList = await Days.findAll({  
            order:[['attendance_day', 'asc']]
        },)   //3.

        const listMap = await Promise.all(daysList.map((item)=>{
            return Days.findOne({
                where:{attendance_day:item.attendance_day},
            })
        }))  //4.

        const AttList = await Promise.all(listMap.map((item)=>{
            return item.getMembers();
        }))  //5.

        res.json({message:true, daysList, AttList})
    }catch(err){
        console.log(err)
        res.json({message:false});
    }
    
})
```

6. 받아온 데이터는 먼저 테이블 형태로 보여줄 것이다 map함수를 사용해서 테이블형태로 만들어서 render한다
   categoryStyle은 보기 편하게 위함이니 생략 가능(css요소)

```jsx
render(){
    const categoryStyle={
        width:500,
    }

    let list = this.state.daysList.map((item, index)=>{
        const total = this.state.AttList[index].length;
        return (
            <tr key={item.id}>
                <td>{item.attendance_day}</td>
                <td>{total}</td>
            </tr>
        )
    })
    return (
        <div>
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
```

7. 여기까지 잘 보인다면 이제 데이터를 가지고 그래프를 만들어본다 그래프는 google에서 제공하는 api를 이용한다
8. 먼저 `npm i react-google-charts` 명령어로 google에서 제공하는 charts 라이브러리를 설치한다
9. 설치가 완료되면 헤더부분에 `import Charts from 'react-google-charts';` 를 추가해준다
10. 이제 잘 작동하는지 google에서 제공하는 예제를 가져다가 실행해본다 그래프는 테이블 위쪽에 나타나게 코딩한다

```jsx
<Chart
  width={'600px'}
  height={'400px'}
  chartType="Line"
  loader={<div>Loading Chart</div>}
  data={[
    [
      'Day',
      'Guardians of the Galaxy',
      'The Avengers',
      'Transformers: Age of Extinction',
    ],
    [1, 37.8, 80.8, 41.8],
    [2, 30.9, 69.5, 32.4],
    [3, 25.4, 57, 25.7],
    [4, 11.7, 18.8, 10.5],
    [5, 11.9, 17.6, 10.4],
    [6, 8.8, 13.6, 7.7],
    [7, 7.6, 12.3, 9.6],
    [8, 12.3, 29.2, 10.6],
    [9, 16.9, 42.9, 14.8],
    [10, 12.8, 30.9, 11.6],
    [11, 5.3, 7.9, 4.7],
    [12, 6.6, 8.4, 5.2],
    [13, 4.8, 6.3, 3.6],
    [14, 4.2, 6.2, 3.4],
  ]}
  options={{
    chart: {
      title: 'Box Office Earnings in First Two Weeks of Opening',
      subtitle: 'in millions of dollars (USD)',
    },
  }}
  rootProps={{ 'data-testid': '3' }}
/>
```

11. 브라우저에서 그래프가 잘 보인다면 이제 data를 우리가 원하는 data로 가공한다 
12. 먼저 list를 정의하는 부분 윗쪽에서 data의 항목들을 정의한다
13. 날짜는 년도를 빼고 월/일만 나타내게 바꿔준다
14. total변수에는 전체 출석 인원, newFriends에는 새친구들의 인원수를 넣어준다
15. 그 다음 push메소드를 사용해서 날짜와 해당날짜에 출석한 전체 인원, 새친구들의 데이터를 넣어준다

```jsx
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
            <td>{item.attendance_day}</td>
            <td>{total}</td>
        </tr>
    )
})
```

16. 이제 Charts 태그에서 data부분을 다 지우고 `data={data}`로 바꿔준다



### 출석 수정

1. 이제 마지막으로 그래프 아래에서 해당 날짜를 눌렀을때 해당 날짜의 출석 인원들을 수정할 수 있는 페이지이다
2. EditAtt.jsx 파일을 만들어 준다
3. Content.jsx에 가서 editAtt 경로를 추가해준다
4. 먼저 날짜를 눌렀을 때 해당 페이지로 이동할 수 있게 NavLink를 사용해서 해당 날짜의 id를 같이 넘겨준다

```
<NavLink to={{pathname:'/editAtt', query:{id:item.id}}}>{item.attendance_day}</NavLink>
```

5. EditAtt.jsx에서는 해당 날짜의 id를 가지고 데이터베이스에서 해당 날짜의 출석한 인원들의 데이터를 받아온다 componentWillMount에서 getAtt를 호출한다 state에 oldList, newList, attList를 정희해준다

```jsx
state={
    oldList:[],
    newList:[],
    attList:[],
}

getAtt= async ()=>{    
    const send_param={
        headers,
        id: this.props.location.query.id,
    }  
    try{
        const oldList=await axios.post('http://localhost:8080/list/show', {headers});
        const newList=await axios.post('http://localhost:8080/list/newList', {headers});
        const attList=await axios.post('http://localhost:8080/attendance/editList', send_param);
        if(oldList.data.list && newList.data.list && attList.data.list ){
            this.setState({
                oldList:oldList.data.list,
                newList:newList.data.list,
                attList:attList.data.list,
            })
        }
    }catch(err){
        return null;
    }
}

componentWillMount(){
    this.getAtt();
}
```

6. 서버에서 다음과 같이 값을 받아서 보내준다

```js
router.post('/editList', async (req,res)=>{
    try{
        const isDay = await Days.findOne({
            where:{id: req.body.id},
        })
        
        const list = await isDay.getMembers();

        res.json({list})
    }catch(err){
        console.log(err);
        res.json({list:false})
    }
})
```

7. 이제 받은 데이터를 가지고 테이블 형태로 만들어주는데 oldList와 newList에 대해 동일한 작업을 하니 함수를 따로 만들어서 호출하는 방식으로 만들어준다 함수는 다음과 같다

```jsx
checkList = (list)=>{
    const result = list.map((item)=>{ 
        let checked = false;
        this.state.attList.forEach((value)=>{
            if (value.id === item.id)
                checked = true;
        })
        return (
            <tr key={item.id}>
                <td>{item.pasture}</td>
                <td>{item.farm}</td>
                <td>{item.name}</td>
                <td><input type="checkbox" defaultChecked={checked} name={item.id}></input></td>
            </tr>
        )
    })

    return result
}
```

8. 이제 render부분에서 함수를 호출하고 return하는 부분에서 값을 사용한다
9. submit 버튼을 누르면 showgraph페이지로 NavLink를 사용해서 이동시킨다

```jsx
render(){
    const attendanceStyle={
        width:500,
    }

    let oldlist = this.checkList(this.state.oldList);
    let newlist = this.checkList(this.state.newList);

    return(
        <div>
            <table className="table" style={attendanceStyle}>
                <thead >
                    <tr>
                        <td>초원</td>
                        <td>목장</td>
                        <td>이름</td>
                        <td>출석</td>
                    </tr>
                </thead>
                <tbody>
                    {oldlist}
                    <td colspan="4">새친구들</td>
                    {newlist}
                </tbody>
            </table>
            <NavLink to="/showgraph"><button onClick={this.editDays}>submit</button></NavLink>
        </div>
    )
}
```

10. editDays함수는 출석할 때 사용하는 attendanceCheck함수와 동일하다 send_param부분에 id를 추가해주고 axios경로를 다음과 같이 바꿔준다

```jsx
editDays = async () =>{
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
        id: this.props.location.query.id,
        checkAtt,
    }
    try{
        const result = await axios.post('http://localhost:8080/attendance/editAtt', send_param);
        if(result.data.message){
            alert(result.data.message);
        }
    }catch(err){
        alert("에러");
    }
}
```

11. server에서는 먼저 해당 날짜의 id로 결과 값을 얻은후에 join table의 메소드를 사용해서 데이터를 수정해준다

```js
router.post('/editAtt', async (req,res)=>{
    try{
        const days_result = await Days.findOne({
            where:{id: req.body.id}
        });
        const filter_result =  req.body.checkAtt.filter((item)=>{
            if(item !== null){
                return item;
            }
        })
        await days_result.setMembers(filter_result)
      
        res.json({message:"수정되었습니다"});
    }catch(err){
        console.log(err);
        res.json({message:false})
    }
})

```









































































