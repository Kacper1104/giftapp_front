import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";

class ReserveGift extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            fields: {},
            errors: {},
        };
        this.state.fields["group"] = false;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

    }

    handleChange(field, event) {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({ fields });
    }

    render() {
        return (
            <Card className={this.props.isMobile ? "card-expanded mx-auto" : "card-expanded"} key={this.props.gift.gift_id}>
                <Card.Body className="card-text">
                    <Card.Title>Rezerwacja - {this.props.gift.gift_name}</Card.Title>
                    {this.props.gift.is_reserved ?
                        <Form>
                            <Form.Group controlId="formBasicPhone">
                                <Form.Label>Numer telefonu</Form.Label>
                                <Form.Control
                                    name="phone"
                                    type="phone"
                                    value={this.state.fields["phone"]}
                                    onChange={this.handleChange.bind(this, "phone")}
                                    placeholder="Wpisz numer telefonu"
                                    isInvalid={this.state.errors["phone"] ? true : false}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.errors["phone"]}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                        :
                        <Form>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check
                                    type="checkbox"
                                    name="group"
                                    label="Zrzutka"
                                    checked={this.state.fields["group"]}
                                    onChange={(event) => {
                                        let fields = this.state.fields;
                                        fields["group"] = event.target.checked;
                                        this.setState({ fields });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Komentarz do rezerwacji</Form.Label>
                                <Form.Control
                                    name="description"
                                    type="description"
                                    as="textarea"
                                    value={this.state.fields["description"]}
                                    onChange={this.handleChange.bind(this, "description")}
                                    placeholder="Komentarz do rezerwacji"
                                    isInvalid={this.state.errors["description"] ? true : false}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.errors["description"]}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {this.state.fields["group"] ?
                                <div>
                                    <Form.Group controlId="formBasicPhone">
                                        <Form.Label>Numer telefonu</Form.Label>
                                        <Form.Control
                                            name="phone"
                                            type="phone"
                                            value={this.state.fields["phone"]}
                                            onChange={this.handleChange.bind(this, "phone")}
                                            placeholder="Wpisz numer telefonu"
                                            isInvalid={this.state.errors["phone"] ? true : false}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {this.state.errors["phone"]}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Liczba uczestników</Form.Label>
                                        <Form.Control
                                            name="number"
                                            type="number"
                                            value={this.state.fields["number"]}
                                            onChange={this.handleChange.bind(this, "number")}
                                            isInvalid={this.state.errors["number"] ? true : false}
                                            as="select">
                                            <option value="0">Wybierz...</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {this.state.errors["number"]}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                : undefined}
                        </Form>
                    }
                </Card.Body>
                <Card.Footer>
                    <Button variant="secondary" type="button" onClick={() => this.props.reserveGift(this.props.gift, this.state.fields["group"], this.state.fields["phone"], this.state.fields["number"])} className={this.props.isMobile ? "btn-block" : "pull-left"}>Zarezerwuj</Button>
                    <Button variant="link" type="button" onClick={this.props.cancelReservation} className={this.props.isMobile ? "btn-block" : "pull-right"}>Anuluj</Button>
                </Card.Footer>
            </Card >
        );
    }
}

export default ReserveGift;