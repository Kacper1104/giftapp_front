import React, { Component } from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <Navbar sticky="top" className="navbar-main" expand="lg">
        <Navbar.Brand href="/events">Praca inżynierska - Kacper Kozimor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/events">Moje wydarzenia</Nav.Link>
            <Nav.Link href="/login">Zaloguj</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default Menu;
