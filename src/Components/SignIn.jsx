import React, { Component } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import MyModal from "./MyModal";
import User from "../ViewModel/User";
import "../custom.scss";
import { FaRegEye } from "react-icons/fa";
import { isMobile } from "react-device-detect";

class SignIn extends Component {
<<<<<<< HEAD
	constructor(props) {
		const query = new URLSearchParams(window.location.search);
		super(props);
		this.state = {
			validated: false,
			fields: {},
			errors: {},
			showModal: query.get("showModal") || false,
			modalTitle: query.get("modalTitle") || "some title",
			modalBody: query.get("modalBody") || "some body"
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount = () => {
		if (this.state.showModal) {
			this.props.showModal(this.state.modalTitle, this.state.modalTitle);
		}
	};
=======
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      fields: {},
      errors: {},
      showModal: false,
      modalTitle: "Some title",
      modalBody: "Some body"
    };
    this.passwordInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
>>>>>>> 1569ef8b612e8df2337a9e8cec46c02549864785

	handleValidation() {
		let fields = this.state.fields;
		let errors = {};
		let formIsValid = true;

		//email
		if (!fields["email"]) {
			formIsValid = false;
			errors["email"] = "Twój email nie może być pusty.";
		}
		//password
		if (!fields["password"]) {
			formIsValid = false;
			errors["password"] = "Twoje hasło nie może być puste.";
		}
		this.setState({ errors: errors, validated: true });
		return formIsValid;
	}

	handleChange(field, event) {
		let fields = this.state.fields;
		fields[field] = event.target.value;
		this.setState({ fields });
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.handleValidation()) {
			console.log("Validation passed");
			this.signIn();
		} else {
			console.log("Form has errors");
		}
	}

	signIn() {
		const user = new User();
		user.email = this.state.fields["email"];
		user.signIn(this.state.fields["password"]).then((result) => {
			if (!result) {
				console.log("Could not sign in!");
				this.props.showModal("Błąd", "Login lub hasło nieprawidłowe");
				// this.setState({
				// 	showModal: true,
				// 	modalTitle: "Błąd",
				// 	modalBody: "Login lub hasło niepoprawne"
				// });
			} else {
				window.location.href = "/";
			}
		});
	}

<<<<<<< HEAD
	render() {
		return (
			<div className="body-form login-form">
				{/* <MyModal
					show={this.state.showModal}
					body={this.state.modalBody}
					title={this.state.modalTitle}
					callback={() => this.setState({ showModal: false })}
				/> */}
				<Form noValidate>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control
							name="email"
							type="email"
							value={this.state.fields["email"]}
							onChange={this.handleChange.bind(this, "email")}
							placeholder="Wpisz adres email"
							isInvalid={this.state.errors["email"] ? true : false}
						/>
						<Form.Control.Feedback type="invalid">
							{this.state.errors["email"]}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>Hasło</Form.Label>
						<Form.Control
							name="password"
							type="password"
							value={this.state.fields["password"]}
							onChange={this.handleChange.bind(this, "password")}
							placeholder="Wpisz swoje hasło"
							isInvalid={this.state.errors["password"] ? true : false}
						/>
						<Form.Control.Feedback type="invalid">
							{this.state.errors["password"]}
						</Form.Control.Feedback>
					</Form.Group>
					<Button variant="primary" type="submit" onClick={this.handleSubmit}>
						Zaloguj
					</Button>
					<Button
						variant="link"
						type="button"
						onClick={() => (window.location.href = "/register")}
					>
						Zarejestruj się
					</Button>
				</Form>
			</div>
		);
	}
=======
  render() {
    return (
      <div className="body-form login-form text-center">
        <MyModal
          show={this.state.showModal}
          body={this.state.modalBody}
          title={this.state.modalTitle}
          callback={() => this.setState({ showModal: false })} />
        <div className="login-header">
          <img src={require("../img/gift.png")}></img>
          <h1 className="h3 mb-3 font-weight-normal"> Zaloguj się</h1></div>
        <div >
          <Form noValidate>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                name="email"
                type="email"
                value={this.state.fields["email"]}
                onChange={this.handleChange.bind(this, "email")}
                placeholder="Wpisz adres email"
                isInvalid={this.state.errors["email"] ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors["email"]}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <InputGroup>
                <Form.Control
                  ref={this.passwordInputRef}
                  name="password"
                  type="password"
                  value={this.state.fields["password"]}
                  onChange={this.handleChange.bind(this, "password")}
                  placeholder="Wpisz swoje hasło"
                  isInvalid={this.state.errors["password"] ? true : false}
                />
                <InputGroup.Append>
                  <div
                    className="btn btn-outline-secondary border-left-0 border"
                    onMouseDownCapture={() => isMobile ? undefined : this.passwordInputRef.current.type = "text"}
                    onMouseLeave={() => isMobile ? undefined : this.passwordInputRef.current.type = "password"}
                    onMouseUpCapture={() => isMobile ? undefined : this.passwordInputRef.current.type = "password"}
                    onClick={() => isMobile ? this.passwordInputRef.current.type = (this.passwordInputRef.current.type === "password" ? "text" : "password") : undefined}
                  >
                    <FaRegEye />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {this.state.errors["password"]}
                  </Form.Control.Feedback>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <div className="confirm-buttons">
              <Button className="btn-block" variant="primary" type="submit" onClick={this.handleSubmit}>
                Zaloguj
          </Button>
              <Button variant="link" type="button" onClick={() => window.location.href = "/register"}>Zarejestruj się</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
>>>>>>> 1569ef8b612e8df2337a9e8cec46c02549864785
}

export default SignIn;
