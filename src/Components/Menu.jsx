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
      <Navbar sticky="top" className="navbar-main" bg="dark" expand="lg">
        <Navbar.Brand href="/home">Gift Me - Kacper Kozimor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Strona główna</Nav.Link>
            <NavDropdown title="Ustawienia" id="basic-nav-dropdown">
              <NavDropdown.Item href="/users">Użytkownicy</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/event/new">Dodaj wydarzenie</Nav.Link>
            <Nav.Link href="/event/select">Pokaż wydarzenie</Nav.Link>
            <Nav.Link href="/events">Moje wydarzenia</Nav.Link>
            <Nav.Link href="/login">Zaloguj</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default Menu;
