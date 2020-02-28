import React, {Component} from 'react';


import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';

import {NavLink, HashRouter} from 'react-router-dom';



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
                            <HashRouter>
                                <NavDropdown title="List" id="basic-nav-dropdown">
                                    <NavDropdown.Item ><NavLink to="/list">Show List</NavLink></NavDropdown.Item>
                                    <NavDropdown.Item ><NavLink to="/newmember">New Member</NavLink></NavDropdown.Item>
                                    <NavDropdown.Item ><NavLink to="/newList">New Friend</NavLink></NavDropdown.Item>
                                    <NavDropdown.Item ><NavLink to="/expelledMember">Expelled List</NavLink></NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Attendance" id="basic-nav-dropdown">
                                    <NavDropdown.Item ><NavLink to="/showgraph">Show Attendance</NavLink></NavDropdown.Item>
                                    <NavDropdown.Item ><NavLink to="/today">Today Attendance</NavLink></NavDropdown.Item>
                                </NavDropdown>
                            </HashRouter>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }


}

export default Navigation;