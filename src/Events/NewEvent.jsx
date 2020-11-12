import React, { Component } from "react";
import { Form, Button } from "react-bootstrap"
import DatePicker, { registerLocale } from "react-datepicker";
import "../custom.scss";
import "react-datepicker/dist/react-datepicker.css";
import pl from 'date-fns/locale/pl';
import MyEvent from "../ViewModel/MyEvent";
import MyModal from "../Components/MyModal";
registerLocale('pl', pl)

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      fields: {},
      errors: {},
      showModal: false,
      modalBody: '',
      modalTitle: ''
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
      errors["name"] = "Nazwa wydarzenia nie może być pusta.";
    }

    //date
    errors["start-date"] = "ERROR";

    this.setState({ errors: errors, validated: true });
    return formIsValid;
  }

  handleSubmit() {
    if (!this.handleValidation()) {
      //console.log('Validation failed!');
    }
    else {
      const myEvent = new MyEvent();
      myEvent.create(this.state.fields["name"], this.state.fields["start-date"]).then((response => {
        if (response) {
          this.props.onCreate();
        }
        else {
          this.setState({
            showModal: true,
            modalTitle: 'Błąd serwera',
            modalBody: 'Nie udało się utworzyć wydarzenia.'
          });
        }
      }));
    }
  }

  handleChange(field, event) {
    let fields = this.state.fields;
    fields[field] = event.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <div className="body-form login-form" >
        <MyModal
          show={this.state.showModal}
          body={this.state.modalBody}
          title={this.state.modalTitle}
          callback={() => this.setState({ showModal: false })} />
        <Form noValidate>
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
                placeholderText="Wybierz datę wydarzenia"
              />
            </Form.Row>
          </Form.Group>
          <Button variant="primary" type="button" onClick={this.handleSubmit}>
            Utwórz
          </Button>
          <Button variant="link" type="button" onClick={this.props.onCancel}>
            Anuluj
          </Button>
        </Form>
      </div >
    );
  }
}

export default NewEvent;
