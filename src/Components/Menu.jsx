import React, { Component } from "react";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <Navbar sticky="top" className="navbar-main" bg="dark" expand="lg">
        <Navbar.Brand href="/home">Gift Me - Kacper Kozimor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="/users">Users</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/event/new">Create event</Nav.Link>
            <Nav.Link href="/event/select">Show event</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default Menu;
