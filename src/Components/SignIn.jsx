import React, { Component } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import MyModal from "./MyModal";
import User from "../ViewModel/User";
import "../custom.scss";
import { FaRegEye } from "react-icons/fa";
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
    this.passwordInputRef = React.createRef();
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
}

export default SignIn;
