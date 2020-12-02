import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap"
import "../custom.scss";
import { isMobile } from "react-device-detect";
import MyEvent from "../ViewModel/Gift";
import MyModal from "../Components/MyModal";
import Gift from "../ViewModel/Gift";

class NewGift extends Component {
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
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Nazwa prezentu nie może być pusta.";
        }
        //description
        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = "Opis prezentu nie może być pusta.";
        }

        this.setState({ errors: errors, validated: true });
        return formIsValid;
    }

    handleSubmit = () => {
        if (!this.handleValidation()) {
            //console.log('Validation failed!');
        } else {
            const newGift = new Gift();
            newGift.create(this.props.eventId, this.state.fields["name"], this.state.fields["description"]).then((response) => !response ? window.location.href = "/error" : this.props.handleCreate());
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
            <Card className={isMobile ? "mx-auto pt-4 card-expanded" : "pt-4 card-expanded"} key="button" >
                <Card.Body><Card.Title>Nowy prezent</Card.Title>
                    <Form noValidate className="card-text">
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Nazwa prezentu</Form.Label>
                            <Form.Control
                                name="name"
                                type="name"
                                value={this.state.fields["name"]}
                                onChange={this.handleChange.bind(this, "name")}
                                placeholder="Wpisz nazwę prezentu"
                                isInvalid={this.state.errors["name"] ? true : false}
                            />
                            <Form.Control.Feedback type="invalid">
                                {this.state.errors["name"]}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Opis</Form.Label>
                            <Form.Control
                                name="description"
                                type="description"
                                as="textarea"
                                value={this.state.fields["description"]}
                                onChange={this.handleChange.bind(this, "description")}
                                placeholder="Opisz prezent"
                                isInvalid={this.state.errors["description"] ? true : false}
                            />
                            <Form.Control.Feedback type="invalid">
                                {this.state.errors["description"]}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" type="button" className="pull-left" onClick={this.handleSubmit}>Utwórz</Button>
                    <Button variant="link" type="button" className="pull-right" onClick={this.handleCancel}>Anuluj</Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default NewGift;
