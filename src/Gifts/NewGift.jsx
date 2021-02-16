import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap"
import "../custom.scss";
import { isMobile } from "react-device-detect";
import Gift from "../ViewModel/Gift";
import ImageUploader from 'react-images-upload';

class NewGift extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            fields: {},
            errors: {},
            pictures: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: picture,
        });
        //console.log(this.state.pictures.concat(picture));
        //const gift = new Gift();
        //gift.changeImage(null, this.state.pictures.concat(picture)[0]).then((url) => {});
    }

    uploadPicture(){}

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
            //newGift.create(this.props.eventId, this.state.fields["name"], this.state.fields["description"]).then((response) => !response ? window.location.href = "/error" : this.props.handleCreate());
            newGift.create(this.props.eventId, this.state.fields["name"], this.state.fields["description"]).then((gift_id) => {
                if(!gift_id) {
                    window.location.href = "/error";
                }
                else {
                    if(this.state.pictures.length === 0) {
                        this.props.handleCreate();
                    }
                    else {
                        newGift.uploadImage(this.state.pictures[0]).then((picture_url) => {
                            newGift.changeImage(gift_id, picture_url).then(this.props.handleCreate());
                        });
                    }
                }
            });
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
                    <ImageUploader
                        withIcon={true}
                        buttonText='Wybierz obrazek'
                        fileSizeError="Zbyt duży rozmiar pliku."
                        fileTypeError="nie jest odpowiednim rozszerzeniem pliku."
                        label="Maksymalny rozmiar pliku: 5MB, akceptowane rozszerzenia: jpg, gif, png"
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
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
