import React, { Component } from 'react';
import { Card, Button, Badge, Spinner, Table, ListGroup, Container, Row, Col } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { FaInfoCircle } from "react-icons/fa";


class GiftCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            isExpanded: false,
            image: this.props.gift.picture ?
                this.props.gift.picture.replace("upload", "upload/h_159,w_254,c_fill") :
                require("../img/gift.png")
        };
        this.cardRef = React.createRef();
        this.imageRef = React.createRef();
    }

    expandCard = () => {
        this.cardRef.current.classList.remove("gift");
        this.cardRef.current.classList.add("card-expanded");
        const y = this.cardRef.current.getBoundingClientRect().top + window.pageYOffset - 44;
        window.scrollTo({ top: y, behavior: 'smooth' });
        //this.imageRef.current.style.display = "none";
        this.setState({ isExpanded: true });
        if (!this.props.isOrganiser) {
            this.props.gift.getReservations(this.props.gift.gift_id)
                .then(json => this.setState({ data: json }));
        }
    }

    collapseCard = () => {
        this.cardRef.current.classList.remove("card-expanded");
        this.cardRef.current.classList.add("gift");
        //this.imageRef.current.style.display = "initial";
        this.setState({ isExpanded: false, data: undefined });
    }

    refreshList = () => {
        console.log(this.props.gift);
        this.props.gift.unreserve().then(() => { this.props.refreshList() });;
    }

    giftDetails = () => {
        return (
            <Card.Text>
                <ListGroup responsive="md" variant="flush">
                    <ListGroup.Item>Opis: {this.props.gift.gift_description}</ListGroup.Item>
                    <ListGroup.Item>Link: {this.props.gift.gift_link ? <a href={this.props.gift.gift_link}>{this.props.gift.gift_link}</a> : "-"}</ListGroup.Item>
                    <ListGroup.Item>Model: {this.props.gift.gift_model ? this.props.gift.gift_model : "-"}</ListGroup.Item>
                    <ListGroup.Item>Cena (około): {this.props.gift.gift_price ? this.props.gift.gift_price + " zł" : "-"}</ListGroup.Item>

                </ListGroup>
            </Card.Text>);
    }

    reservationTable() {
        const data = this.state.data;
        return isMobile ?
            (<div className="card-text">
                {data.map((reservation, index) => {
                    //console.log(event);
                    const { id, description, user_name, user_email, contact_number, event_id, role } = reservation //destructuring
                    return (<ListGroup variant="flush" className="my-2 border-top border-secondary" key={id}>
                        <ListGroup.Item>{"Rezerwujący: " + user_name}</ListGroup.Item>
                        <ListGroup.Item>{"Email: " + user_email}</ListGroup.Item>
                        <ListGroup.Item>{"Numer telefonu: " + contact_number}</ListGroup.Item>
                        <ListGroup.Item>{"Komentarz: " + description}</ListGroup.Item>
                    </ListGroup>);
                })}
            </div>) :
            (<Table size="sm" className="card-text">
                <thead>
                    <tr>
                        <td>Rezerwujący</td>
                        <td>Email</td>
                        <td>Numer telefonu</td>
                        <td>Komentarz</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((reservation, index) => {
                        //console.log(event);
                        const { id, description, user_name, user_email, contact_number, event_id, role } = reservation //destructuring
                        return (<tr>
                            <td>{user_name}</td>
                            <td>{user_email}</td>
                            <td>{contact_number}</td>
                            <td>{description}</td>
                        </tr>);
                    })}
                </tbody>
            </Table>);
    }

    render() {
        return (
            <Card ref={this.cardRef} className={isMobile ? "gift mx-auto" : "gift"}>
                {!this.state.isExpanded
                    ? <Card.Img ref={this.imageRef} variant="top" src={this.state.image} onClick={this.state.isExpanded ? this.collapseCard : this.expandCard} />
                    : undefined}
                <Card.Body className="" onClick={this.state.isExpanded ? this.collapseCard : this.expandCard}>
                    <Card.Title>
                        {this.props.isOrganiser ? undefined : this.props.gift.user_res === 1 ?
                            (this.props.gift.res_max_contributors > 1 ?
                                <Badge variant="success" className="pull-right">Zrzutka {this.props.gift.res_count + "/" + this.props.gift.res_max_contributors}</Badge> :
                                <Badge variant="success" className="pull-right">Moje</Badge>) :
                            (this.props.gift.is_reserved === 1 ?
                                (this.props.gift.res_count < this.props.gift.res_max_contributors ?
                                    <Badge variant="warning" className="pull-right">Zrzutka {this.props.gift.res_count + "/" + this.props.gift.res_max_contributors}</Badge> :
                                    (this.props.gift.res_count > 1 ?
                                        <Badge variant="danger" className="pull-right">Zrzutka {this.props.gift.res_count + "/" + this.props.gift.res_max_contributors}</Badge> :
                                        <Badge variant="danger" className="pull-right">Zajęty</Badge>)) :
                                <Badge variant="info" className="pull-right">Wolny</Badge>)}
                        {this.props.gift.gift_name}
                    </Card.Title>
                    {this.state.isExpanded
                        ? <Container fluid>
                            <Row>
                                <Col md={4}>
                                    <Card.Img ref={this.imageRef} variant="top" src={this.state.image} />
                                </Col>
                                <Col md={8}>
                                    {this.giftDetails()}
                                    {this.props.isOrganiser
                                        ? undefined
                                        : this.props.gift.is_reserved
                                            ? this.state.data === undefined
                                                ? <Spinner animation="border" role="status">
                                                    <span className="sr-only">Ładowanie...</span>
                                                </Spinner>
                                                : this.reservationTable()
                                            : undefined}
                                </Col>
                            </Row>
                        </Container>
                        : <Card.Text className={this.state.isExpanded ? undefined : "truncate"}>{this.props.gift.gift_description}</Card.Text>}
                </Card.Body>
                <Card.Footer>
                    {!this.props.isOrganiser && this.props.gift.is_reserved === 0 ?
                        <div class="small text-success text-left mb-4">
                            <FaInfoCircle size="17" ></FaInfoCircle> Klikając zarezerwuj możesz zorganizować zrzutkę i podzielić się kosztami prezentu!
                        </div> :
                        undefined}
                    {this.props.isOrganiser ? undefined : (this.props.gift.is_reserved === 0 ?
                        <Button variant="light" type="button" onClick={this.props.setClickedId} className="pull-left"> Zarezerwuj </Button> :
                        (this.props.gift.res_count < this.props.gift.res_max_contributors && !this.props.gift.user_res ?
                            <Button variant="light" type="button" onClick={this.props.setClickedId} className="pull-left"> Dołącz </Button> :
                            this.props.gift.user_res ?
                                <Button variant="warning" className="pull-left" onClick={this.refreshList}>Zwolnij</Button> : undefined))}
                    {this.state.isExpanded ?
                        <Button variant="link" type="button" onClick={this.collapseCard} className="pull-right"> Ukryj </Button> :
                        <Button variant="link" type="button" onClick={this.expandCard} className="pull-right"> Więcej </Button>}
                </Card.Footer>
            </Card >
        );
    }
}

export default GiftCard;
