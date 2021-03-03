import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap"
import "../custom.scss";
import { isMobile } from "react-device-detect";
import MyEvent from "../ViewModel/MyEvent";

class JoinEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            fields: {},
            errors: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //name
        if (!fields["code"]) {
            formIsValid = false;
            errors["code"] = "Wpisz kod dostępu.";
        }

        this.setState({ errors: errors, validated: true });
        return formIsValid;
    }

    setFieldError() {
        let errors = {};
        errors["code"] = "Ten kod dostępu jest nieprawidłowy lub został już użyty. Jeżeli nie wykorzystałeś swojego kodu lub potrzebujesz nowego, skontaktuj się z organizatorem wydarzenia."
        this.setState({ errors: errors, validated: true });
    }

    handleSubmit = () => {
        if (!this.handleValidation()) {
            //console.log('Validation failed!');
        } else {
            const event = new MyEvent();
            event.joinEvent(this.state.fields["code"]).then((response) => !response ? this.setFieldError() : this.props.onJoin());
        }
    }

    handleCancel = () => {
        this.setState({ fields: undefined });
        this.props.onCancel();
    }

    handleChange(field, event) {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({ fields });
    }

    render() {
        return (
            <Card className={isMobile ? "card-expanded pt-4 pb-4" : "card-expanded pt-4 mb-4"} key="button" >
                <Card.Body><Card.Title>Dołącz do wydarzenia</Card.Title>
                    <Form noValidate className="card-text">
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Kod dostępu</Form.Label>
                            <Form.Control
                                name="code"
                                type="code"
                                value={this.state.fields["code"]}
                                onChange={this.handleChange.bind(this, "code")}
                                placeholder="Wpisz kod"
                                isInvalid={this.state.errors["code"] ? true : false}
                            />
                            <Form.Control.Feedback type="invalid">
                                {this.state.errors["code"]}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" type="button" className="pull-left" onClick={this.handleSubmit}>Dołącz</Button>
                    <Button variant="link" type="button" className="pull-right" onClick={this.handleCancel}>Anuluj</Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default JoinEvent;
