import React, { Component } from 'react';
import { Card, Button, Badge, Spinner, Table, ListGroup } from "react-bootstrap";
import { CardBody } from 'react-bootstrap/Card';
import Gift from "../ViewModel/Gift"
import ReserveGift from './ReserveGift';
import { isMobile } from "react-device-detect";


class GiftCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            isExpanded: false
        };
        this.cardRef = React.createRef();
        this.imageRef = React.createRef();
    }

    expandCard = () => {
        this.cardRef.current.classList.remove("gift");
        this.cardRef.current.classList.add("card-expanded");
        this.imageRef.current.style.display = "none";
        this.setState({ isExpanded: true });
        this.props.gift.getReservations(this.props.gift.gift_id)
            .then(json => this.setState({ data: json }));
    }

    collapseCard = () => {
        this.cardRef.current.classList.remove("card-expanded");
        this.cardRef.current.classList.add("gift");
        this.imageRef.current.style.display = "initial";
        this.setState({ isExpanded: false, data: undefined });
    }

    refreshList = () => {
        console.log(this.props.gift);
        this.props.gift.unreserve().then(() => { this.props.refreshList() });;
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
                <Card.Img ref={this.imageRef} variant="top" src={require("../img/gift.png")} />
                <Card.Body className="">
                    <Card.Title>{this.props.gift.gift_name}{this.props.isOrganiser ? undefined : this.props.gift.user_res === 1 ?
                        (this.props.gift.res_max_contributors > 1 ?
                            <Badge variant="success" className="pull-right">Zrzutka {this.props.gift.res_count + "/" + this.props.gift.res_max_contributors}</Badge> :
                            <Badge variant="success" className="pull-right">Moje</Badge>) :
                        (this.props.gift.is_reserved === 1 ?
                            (this.props.gift.res_count < this.props.gift.res_max_contributors ?
                                <Badge variant="warning" className="pull-right">Zrzutka {this.props.gift.res_count + "/" + this.props.gift.res_max_contributors}</Badge> :
                                (this.props.gift.res_count > 1 ?
                                    <Badge variant="danger" className="pull-right">Zrzutka {this.props.gift.res_count + "/" + this.props.gift.res_max_contributors}</Badge> :
                                    <Badge variant="danger" className="pull-right">Zajęty</Badge>)) :
                            <Badge variant="info" className="pull-right">Wolny</Badge>)}</Card.Title>

                    <Card.Text className={this.state.isExpanded ? undefined : "truncate"}>{this.props.gift.gift_description}</Card.Text>
                    {this.state.isExpanded && this.props.gift.is_reserved ?
                        this.state.data === undefined ?
                            <Spinner animation="border" role="status"><span className="sr-only">Ładowanie...</span></Spinner> :
                            this.reservationTable() : undefined}
                </Card.Body>
                <Card.Footer>
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
