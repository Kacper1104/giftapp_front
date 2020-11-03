import React, { Component } from "react";
import { Form, Button } from "react-bootstrap"
import DatePicker, { registerLocale } from "react-datepicker";
import "../custom.scss";
import "react-datepicker/dist/react-datepicker.css";
import pl from 'date-fns/locale/pl';
import MyEvent from "../ViewModel/MyEvent";
registerLocale('pl', pl)

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      fields: {},
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log(this.state.fields);
    const myEvent = new MyEvent();
    console.log("DUPA")
    myEvent.create(this.state.fields["name"], this.state.fields["start-date"]);
  }

  handleChange(field, event) {
    let fields = this.state.fields;
    fields[field] = event.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <div className="body-form login-form" >
        <Form noValidate>
          <Form.Group controlId="formBasicDate">
            <Form.Label>Data wydarzenia</Form.Label>
            <Form.Row className="datepicker-row" >
              <DatePicker className="form-control" type="date" name="start-date"
                selected={this.state.fields["start-date"]}
                onChange={(date) => {
                  let fields = this.state.fields;
                  fields["start-date"] = date;
                  this.setState({ fields });
                }}
                onSelect={(date) => {
                  let fields = this.state.fields;
                  fields["start-date"] = date;
                  this.setState({ fields });
                }}
                dateFormat="dd/MM/yyyy"
                locale="pl"
                placeholderText="Wybierz datę wydarzenia" />
            </Form.Row>
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Nazwa wydarzenia</Form.Label>
            <Form.Control
              name="name"
              type="name"
              value={this.state.fields["name"]}
              onChange={this.handleChange.bind(this, "name")}
              placeholder="Wpisz nazwę wydarzenia"
              isInvalid={this.state.errors["name"] ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors["name"]}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="button" onClick={this.handleSubmit}>
            Utwórz
          </Button>
          <Button variant="link" type="button" onClick={() => { return; }}>
            Anuluj
          </Button>
        </Form>
      </div >
    );
  }
}

export default NewEvent;
