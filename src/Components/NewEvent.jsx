import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "../custom.scss";

class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newUser: undefined, value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showCreateAccountForm = this.showCreateAccountForm.bind(this);
    this.showAuthenticationForm = this.showAuthenticationForm.bind(this);
  }

  showCreateAccountForm() {
    this.setState({ newUser: true });
  }

  showAuthenticationForm() {
    this.setState({ newUser: false });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return this.state.newUser === undefined ? (
      <div class="body-form">
        <h5>Czy pierwszy raz korzystasz z GiftApp?</h5>
        <Button
          variant="primary"
          type="submit"
          onClick={this.showCreateAccountForm}
        >
          Tak
        </Button>
        <Button
          variant="inverse"
          type="submit"
          onClick={this.showAuthenticationForm}
        >
          Nie
        </Button>
      </div>
    ) : this.state.newUser === true ? (
      <div class="body-form">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Wpis adres email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    ) : (
      <p>INSERT AUTHENTICATION FORM</p>
    );
  }
}

export default NewEvent;
