import React, { Component } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import MyModal from "./MyModal"
import User from "../ViewModel/User";
import "../custom.scss";
import { isMobile } from "react-device-detect";
import { FaRegEye } from "react-icons/fa";

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalTitle: "Some title",
      modalBody: "Some body",
      redir: "",
      validated: false,
      fields: {},
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.passwordInputRef = React.createRef();
    this.repeatPasswordInputRef = React.createRef();
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
      if (result === 201) {
        window.location.href = "/events";
      }
      else if (result === 409) {
        console.log("Could not register!");
        var errors = this.state.errors;
        errors["email"] = "Ten adres email jest już zajęty."
        this.setState({ errors })
      }
      else {
        this.setState({ showModal: true, modalTitle: "Wystąpił nieoczekiwany błąd.", modalBody: "Proszę spróbować później." })
      }
    });
  }

  render() {
    return (
      <div className={isMobile ? "body-form login-form" : "body-form login-form text-center"}>
        <MyModal
          show={this.state.showModal}
          title={this.state.modalTitle}
          body={this.state.modalBody}
          callback={() => this.setState({ showModal: false })}
        >
        </MyModal>
        <div className="login-header">
          <img src={require("../img/gift.png")}></img>
          <h1 className="h3 mb-3 font-weight-normal"> Zarejestruj się</h1></div>
        <div ></div>
        <Form noValidate className="text-left">
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
              </InputGroup.Append>
              <Form.Control.Feedback type="invalid">
                {this.state.errors["password"]}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formBasicRepeatPassword">
            <Form.Label>Wpisz ponownie swoje hasło</Form.Label>
            <InputGroup>
              <Form.Control
                ref={this.repeatPasswordInputRef}
                name="repeatPassword"
                type="password"
                value={this.state.fields["repeatPassword"]}
                onChange={this.handleChange.bind(this, "repeatPassword")}
                placeholder="Potwierdź swoje hasło"
                isInvalid={this.state.errors["repeatPassword"] ? true : false}
              />
              <InputGroup.Append>
                <div
                  className="btn btn-outline-secondary border-left-0 border"
                  onMouseDownCapture={() => isMobile ? undefined : this.repeatPasswordInputRef.current.type = "text"}
                  onMouseLeave={() => isMobile ? undefined : this.repeatPasswordInputRef.current.type = "password"}
                  onMouseUpCapture={() => isMobile ? undefined : this.repeatPasswordInputRef.current.type = "password"}
                  onClick={() => isMobile ? this.repeatPasswordInputRef.current.type = (this.repeatPasswordInputRef.current.type === "password" ? "text" : "password") : undefined}
                >
                  <FaRegEye />
                </div>
              </InputGroup.Append>
              <Form.Control.Feedback type="invalid">
                {this.state.errors["repeatPassword"]}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <div className="confirm-buttons text-center">
            <Button variant="primary btn-block" type="submit" onClick={this.handleSubmit}>
              Zarejestruj
          </Button>
            <Button variant="link" type="button" onClick={() => window.location.href = "/login"}>Wróć do logowania</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default RegisterUser;
