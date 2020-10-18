import React, { Component } from "react";
import RegisterUser from "../Components/RegisterUser";
import "../custom.scss";

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { newUser: undefined, value: "" };

    this.handleChange = this.handleChange.bind(this);
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

  render() {
    return this.state.newUser === undefined ? (
      <RegisterUser />
    ) : (
      <p>INSERT AUTHENTICATION FORM</p>
    );
  }
}

export default NewEvent;
