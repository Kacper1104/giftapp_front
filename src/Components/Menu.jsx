import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

class Menu extends Component {
	render() {
		return this.props.loggedIn === undefined ? undefined : (
			<Navbar sticky="top" className="navbar-main" expand="lg">
				<Navbar.Brand href={this.props.loggedIn ? "/events" : "/login"}>
					Wesele Kai i Kacpra
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						{this.props.loggedIn ? (
							<Nav.Link href="/events">Moje wydarzenia</Nav.Link>
						) : (
							<Nav.Link href="/login">Zaloguj</Nav.Link>
						)}
					</Nav>
					{this.props.loggedIn ? (
						<Nav className="justify-content-end">
							<text className="mr-1">
								{"Zalogowano jako: " + this.props.name + " "}
							</text>
							<a
								href="/login"
								onClick={() => {
									localStorage.removeItem("token");
								}}
							>
								Wyloguj
							</a>
						</Nav>
					) : undefined}
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
export default Menu;
