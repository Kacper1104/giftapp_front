import React, { Component } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./custom.scss";
import Menu from "./Components/Menu";
import SignIn from "./Components/SignIn";
import Events from "./Events/Events";
import RegisterUser from "./Components/RegisterUser";
import User from "./ViewModel/User";
import MyModal from "./Components/MyModal";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			showModal: false,
			modalTitle: "Some title",
			modalBody: "Some body"
		};

		this.showModal.bind(this);
	}

	checkUserLoggedIn = () => {
		const user = new User();
		return user.auth();
	};

	componentDidMount = () => {
		this.checkUserLoggedIn().then((user) =>
			this.setState({
				loggedIn: user ? true : false,
				name: user.name,
				email: user.email
			})
		);
	};

	showModal = (title, body) => {
		this.setState({
			showModal: true,
			modalTitle: this.state.modalTitle,
			modalBody: this.state.modalBody
		});
	};

	render() {
		return (
			<div className="App">
				<MyModal
					show={this.state.showModal}
					title={this.state.modalTitle}
					body={this.state.modalBody}
					callback={() => this.setState({ showModal: false })}
				></MyModal>
				<Menu
					loggedIn={this.state.loggedIn ? this.state.loggedIn : false}
					name={this.state.name}
					email={this.state.email}
				/>
				<Switch>
					<Route exact path="/">
						{this.state.loggedIn ? <Events /> : <SignIn />}
					</Route>
					<Route exact path="/events">
						<Events />
					</Route>
					<Route exact path="/login">
						<SignIn showModal={(title, body) => this.showModal(title, body)} />
					</Route>
					<Route exact path="/register">
						<RegisterUser
							showModal={(title, body) => this.showModal(title, body)}
						/>
					</Route>
				</Switch>
			</div>
		);
	}
}

//===========================

ReactDOM.render(<Main />, document.getElementById("root"));
