import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';


import {Route, NavLink, HashRouter} from 'react-router-dom';
import ShowList from './ShowList';
import UpdateList from './UpdateList';
import Attendance from './Attendance';

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
                                <NavDropdown.Item ><NavLink to="/showlist">Show List</NavLink></NavDropdown.Item>
                                <NavDropdown.Item ><NavLink to="/updatelist">Update List</NavLink></NavDropdown.Item>
                                <NavDropdown.Item ><NavLink to="/newmember">New Member</NavLink></NavDropdown.Item>
                                <NavDropdown.Item ><NavLink to="/expelledMember">Expelled List</NavLink></NavDropdown.Item>
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
                            <Route path="/showlist" component={ShowList} />
                            <Route path="/updatelist" component={UpdateList} />
                            {/* <Route path="/newmember" component={ShowList} />
                            <Route path="/expelledMember" component={ShowList} />
                            <Route path="/showgraph" component={Attendance} /> */}
                            <Route path="/todayAttendance" component={Attendance} />
                        </div>
                    </div>
                </HashRouter>
            </div>
        )
    }
}

export default MainPage;