import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import User from "../ViewModel/User";
import "../custom.scss";

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      fields: {},
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Twoja nazwa nie może być pusta.";
    }
    //email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Twój email nie może być pusty.";
    }
    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Twój email jest niepoprawny.";
      }
    }
    //passwords
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Twoje hasło nie może być puste.";
    }
    if (fields["repeatPassword"] !== fields["password"]) {
      formIsValid = false;
      errors["repeatPassword"] = "Hasła nie sią takie same.";
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
      this.register();
    } else {
      console.log("Form has errors");
    }
  }

  register() {
    const user = new User();
    user.name = this.state.fields["name"];
    user.email = this.state.fields["email"];
    user.register(this.state.fields["password"]).then((result) => {
      if (!result) {
        console.log("Could not register!");
        alert("Error!");
      }
    });
  }

  render() {
    return (
      <div className="body-form">
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
          <Form.Group controlId="formBasicName">
            <Form.Label>Imię</Form.Label>
            <Form.Control
              name="name"
              type="name"
              value={this.state.fields["name"]}
              onChange={this.handleChange.bind(this, "name")}
              placeholder="Wpisz swoją nazwę"
              isInvalid={this.state.errors["name"] ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors["name"]}
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
          <Form.Group controlId="formBasicRepeatPassword">
            <Form.Label>Wpisz ponownie swoje hasło</Form.Label>
            <Form.Control
              name="repeatPassword"
              type="password"
              value={this.state.fields["repeatPassword"]}
              onChange={this.handleChange.bind(this, "repeatPassword")}
              placeholder="Potwierdź swoje hasło"
              isInvalid={this.state.errors["repeatPassword"] ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors["repeatPassword"]}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Zarejestruj
          </Button>
        </Form>
      </div>
    );
  }
}

export default RegisterUser;
