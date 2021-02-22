import React, { Component } from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.loggedIn === undefined ? undefined :
      <Navbar sticky="top" className="navbar-main" expand="lg">
        <Navbar.Brand href={this.props.loggedIn ? "/events" : "/login"}>Wesele Kai i Kacpra</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {this.props.loggedIn ? <Nav.Link href="/events">Moje wydarzenia</Nav.Link> :
            <Nav.Link href="/login">Zaloguj</Nav.Link>}
          </Nav>
          {this.props.loggedIn ?
            <Nav className="justify-content-end">
              {"Zalogowano jako: "+this.props.name}
            </Nav> :
            undefined}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default Menu;
