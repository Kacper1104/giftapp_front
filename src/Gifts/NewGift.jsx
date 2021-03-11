import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "../custom.scss";
import { isMobile } from "react-device-detect";
import Gift from "../ViewModel/Gift";
import ImageUploader from "react-images-upload";

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
		this.validateURL = this.validateURL.bind(this);
	}

	onDrop(picture) {
		this.setState({
			pictures: picture
		});
		//console.log(this.state.pictures.concat(picture));
		//const gift = new Gift();
		//gift.changeImage(null, this.state.pictures.concat(picture)[0]).then((url) => {});
	}

	validateURL(str) {
		var pattern = new RegExp(
			"^(https?:\\/\\/)?" + // protocol
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
				"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
				"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
				"(\\#[-a-z\\d_]*)?$",
			"i"
		); // fragment locator
		return !!pattern.test(str);
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
		//link
		if (fields["link"] && !this.validateURL(fields["link"])) {
			formIsValid = false;
			errors["link"] = "Link powinien zawierać adres URL.";
		}
		//price
		if (
			fields["price"] &&
			!/^\d{1,9}(?:[,.]?\d{0,2})?$/.test(fields["price"])
		) {
			formIsValid = false;
			errors["price"] =
				"Cena powinna być liczbą z dokładnością do 2 miejsc po przecinku.";
		}

		this.setState({ errors: errors, validated: true });
		return formIsValid;
	}

	handleSubmit = () => {
		if (!this.handleValidation()) {
			//console.log('Validation failed!');
		} else {
			const newGift = new Gift();
			newGift
				.create(
					this.props.eventId,
					this.state.fields["name"],
					this.state.fields["description"],
					this.state.fields["price"],
					this.state.fields["model"],
					this.state.fields["link"]
				)
				.then((gift_id) => {
					if (!gift_id) {
						window.location.href = "/error";
					} else {
						if (this.state.pictures.length === 0) {
							this.props.handleCreate();
						} else {
							newGift
								.uploadImage(this.state.pictures[0])
								.then((picture_url) => {
									newGift
										.changeImage(gift_id, picture_url)
										.then(this.props.handleCreate());
								});
						}
					}
				});
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
					isMobile ? "mx-auto pt-4 card-expanded" : "pt-4 card-expanded"
				}
				key="button"
			>
				<Card.Body>
					<Card.Title>Nowy prezent</Card.Title>
					<Form noValidate className="card-text">
						<ImageUploader
							withPreview
							buttonText="Wybierz obrazek"
							fileSizeError="Zbyt duży rozmiar pliku."
							fileTypeError="nie jest odpowiednim rozszerzeniem pliku."
							label="Maksymalny rozmiar pliku: 5MB, akceptowane rozszerzenia: jpg, gif, png"
							onChange={this.onDrop}
							singleImage
							imgExtension={[".jpg", ".gif", ".png", ".gif"]}
							maxFileSize={5242880}
						/>
						<Form.Group controlId="formBasicName">
							<Form.Label>Nazwa prezentu</Form.Label>
							<Form.Control
								name="name"
								type="name"
								defaultValue={this.state.fields["name"]}
								onChange={this.handleChange.bind(this, "name")}
								placeholder="Wpisz nazwę prezentu"
								isInvalid={this.state.errors["name"] ? true : false}
							/>
							<Form.Control.Feedback type="invalid">
								{this.state.errors["name"]}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="formBasicDescrption">
							<Form.Label>Opis</Form.Label>
							<Form.Control
								name="description"
								type="description"
								as="textarea"
								defaultValue={this.state.fields["description"]}
								onChange={this.handleChange.bind(this, "description")}
								placeholder="Opisz prezent"
								isInvalid={this.state.errors["description"] ? true : false}
							/>
							<Form.Control.Feedback type="invalid">
								{this.state.errors["description"]}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="formBasicLink">
							<Form.Label>Link</Form.Label>
							<Form.Control
								name="link"
								type="link"
								defaultValue={this.state.fields["link"]}
								onChange={this.handleChange.bind(this, "link")}
								placeholder="Wpisz link do prezentu"
								isInvalid={this.state.errors["link"] ? true : false}
							/>
							<Form.Control.Feedback type="invalid">
								{this.state.errors["link"]}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="formBasicModel">
							<Form.Label>Nazwa modelu</Form.Label>
							<Form.Control
								name="model"
								type="model"
								defaultValue={this.state.fields["model"]}
								onChange={this.handleChange.bind(this, "model")}
								placeholder="Wpisz nazwę modelu produktu"
								isInvalid={this.state.errors["model"] ? true : false}
							/>
							<Form.Control.Feedback type="invalid">
								{this.state.errors["model"]}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="formBasicPrice">
							<Form.Label>Cena (około)</Form.Label>
							<Form.Control
								name="price"
								type="price"
								defaultValue={this.state.fields["price"]}
								onChange={this.handleChange.bind(this, "price")}
								placeholder="Wpisz przybliżoną cenę produktu"
								isInvalid={this.state.errors["price"] ? true : false}
							/>
							<Form.Control.Feedback type="invalid">
								{this.state.errors["price"]}
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

export default NewGift;
