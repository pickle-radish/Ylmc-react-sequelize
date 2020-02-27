import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';


import {Route, NavLink, HashRouter} from 'react-router-dom';
import ShowList from './ShowList';
import UpdateList from './UpdateList';
import NewMember from './NewMember';
import NewFriend from './NewFriend';
import Expelled from './Expelled';
import ShowGraph from './ShowGraph';
import Attendance from './Attendance';
import EditAtt from './EditAtt';

class MainPage extends Component{
    
    render(){

        return (
            <div>
                <HashRouter>
                    <div>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home">Ylmc</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <NavDropdown title="List" id="basic-nav-dropdown">
                                <NavDropdown.Item ><NavLink to="/list">Show List</NavLink></NavDropdown.Item>
                                <NavDropdown.Item ><NavLink to="/newmember">New Member</NavLink></NavDropdown.Item>
                                <NavDropdown.Item ><NavLink to="/newList">New Friend</NavLink></NavDropdown.Item>
                                <NavDropdown.Item ><NavLink to="/expelledMember">Expelled List</NavLink></NavDropdown.Item>
                                {/* <ul className="header">
                                    <li><NavLink to="/list">Show List</NavLink></li>
                                    <li><NavLink to="/newmember">New Member</NavLink></li>
                                    <li><NavLink to="/expelledMember">Expelled List</NavLink></li>
                                </ul> */}
                            </NavDropdown>
                            <NavDropdown title="Attendance" id="basic-nav-dropdown">
                                <NavDropdown.Item ><NavLink to="/showgraph">Show Attendance</NavLink></NavDropdown.Item>
                                <NavDropdown.Item ><NavLink to="/todayAttendance">Today Attendance</NavLink></NavDropdown.Item>
                            </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                        
                        
                        <div id="content">
                            <Route exact path="/" />
                            <Route path="/list" component={ShowList} />
                            <Route path="/update" component={UpdateList} />
                            <Route path="/newmember" component={NewMember} />
                            <Route path="/newList" component={NewFriend} />
                            <Route path="/expelledMember" component={Expelled} />
                            <Route path="/showgraph" component={ShowGraph} />
                            <Route path="/todayAttendance" component={Attendance} /> 
                            <Route path="/EditAtt" component={EditAtt} /> 
                        </div>
                    </div>
                </HashRouter>
            </div>
        )
    }
}

export default MainPage;