import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "../custom.scss";
import { isMobile } from "react-device-detect";
import MyEvent from "../ViewModel/MyEvent";

class NewCode extends Component {
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
			errors["name"] = "Nazwa gościa nie może być pusta.";
		}

		this.setState({ errors: errors, validated: true });
		return formIsValid;
	}

	handleSubmit = () => {
		if (!this.handleValidation()) {
			//console.log('Validation failed!');
		} else {
			const event = new MyEvent(
				this.props.eventId,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
			event
				.createCode(this.state.fields["name"])
				.then((response) =>
					!response
						? (window.location.href = "/error")
						: this.props.handleCreate()
				);
		}
	};

	handleCancel = () => {
		this.setState({ fields: undefined });
		this.props.onCancel();
	};

	handleChange(field, event) {
		let fields = this.state.fields;
		fields[field] = event.target.value;
		this.setState({ fields });
	}

	render() {
		return (
			<Card
				className={
					isMobile ? "card-expanded pt-4 pb-4" : "card-expanded pt-4 mb-4"
				}
				key="button"
			>
				<Card.Body>
					<Card.Title>Nowy kod dostępu</Card.Title>
					<Form noValidate className="card-text">
						<Form.Group controlId="formBasicName">
							<Form.Label>Gość</Form.Label>
							<Form.Control
								name="name"
								type="name"
								value={this.state.fields["name"]}
								onChange={this.handleChange.bind(this, "name")}
								placeholder="Wpisz imię gościa"
								isInvalid={this.state.errors["name"] ? true : false}
							/>
							<Form.Control.Feedback type="invalid">
								{this.state.errors["name"]}
							</Form.Control.Feedback>
						</Form.Group>
					</Form>
				</Card.Body>
				<Card.Footer>
					<Button
						variant="primary"
						type="button"
						className="pull-left"
						onClick={this.handleSubmit}
					>
						Utwórz
					</Button>
					<Button
						variant="link"
						type="button"
						className="pull-right"
						onClick={this.handleCancel}
					>
						Anuluj
					</Button>
				</Card.Footer>
			</Card>
		);
	}
}

export default NewCode;
