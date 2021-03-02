import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import MyModal from "./MyModal";
import User from "../ViewModel/User";
import "../custom.scss";
import { isMobile } from "react-device-detect";

class SignIn extends Component {
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

    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
        this.setState({
          showModal: true,
          modalTitle: "Błąd",
          modalBody: "Login lub hasło niepoprawne"
        });
      }
      else {
        window.location.href = "/";
      }
    });
  }

  render() {
    return (
      <div className={isMobile ? "body-form login-form" : "body-form login-form login-border"}>
        <MyModal
          show={this.state.showModal}
          body={this.state.modalBody}
          title={this.state.modalTitle}
          callback={() => this.setState({ showModal: false })} />
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
          <div className="confirm-buttons">
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Zaloguj
          </Button>
            <Button variant="link" type="button" onClick={() => window.location.href = "/register"}>Zarejestruj się</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default SignIn;
