import React, { Component } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./custom.scss";
import Menu from "./Components/Menu";
import SignIn from "./Components/SignIn";
import Events from "./Events/Events";
import RegisterUser from "./Components/RegisterUser";
import { Home } from "./Components/Home";
import User from "./ViewModel/User";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signedIn: false
		};
	}

	checkUserLoggedIn = () => {
		const user = new User();
		return user.auth();
	};

	componentDidMount = () => {
		this.checkUserLoggedIn().then((user) =>
			this.setState({
				signedIn: user ? true : false,
				name: user.name,
				email: user.email
			})
		);
	};

	render() {
		return (
			<div className="App">
				<Menu
					loggedIn={this.state.signedIn ? this.state.signedIn : false}
					name={this.state.name}
					email={this.state.email}
				/>
				<Switch>
					<Route exact path="/">
						{this.state.signedIn ? <Events /> : <SignIn />}
					</Route>
					<Route exact path="/events">
						<Events />
					</Route>
					<Route exact path="/login">
						<SignIn />
					</Route>
					<Route exact path="/register">
						<RegisterUser />
					</Route>
				</Switch>
			</div>
		);
	}
}

//===========================

ReactDOM.render(<Main />, document.getElementById("root"));
