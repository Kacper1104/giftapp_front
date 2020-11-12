import React from 'react';
import { Card, CardDeck, Button, Badge } from "react-bootstrap";
import Gift from "../ViewModel/Gift"


export const GiftsList = props => {

    const printRow = (data, isMobile) => {
        return data.map((row, index) => {
            const gift = new Gift(row.gift_id, row.gift_name, row.gift_description,
                row.gift_changed_date, row.res_max_contributors, row.res_changed_date, row.is_reserved, row.is_user_res, row.res_count); //deconstruction
            return (
                <Card className={isMobile ? "gift mx-auto" : "gift"} key={gift.gift_id}>
                    <Card.Img variant="top" src={require("../img/gift.png")} />
                    <Card.Body className="">
                        <Card.Title>{gift.gift_name}{props.isOrganiser ? undefined : gift.user_res === 1 ?
                            <Badge variant="success" className="pull-right">Moje</Badge> :
                            (gift.is_reserved === 1 ?
                                (gift.res_count < gift.res_max_contributors ?
                                    <Badge variant="warning" className="pull-right">Zrzutka {gift.res_count + "/" + gift.res_max_contributors}</Badge> :
                                    (gift.res_count > 1 ?
                                        <Badge variant="danger" className="pull-right">Zrzutka {gift.res_count + "/" + gift.res_max_contributors}</Badge> :
                                        <Badge variant="danger" className="pull-right">Zajęty</Badge>)) :
                                <Badge variant="info" className="pull-right">Wolny</Badge>)}</Card.Title>

                        <Card.Text className="truncate">{gift.gift_description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {props.isOrganiser ? undefined : (gift.is_reserved === 0 ?
                            <Button variant="light" type="button" onClick={() => props.reserveGift(gift)} className="pull-left"> Zarezerwuj </Button> :
                            (gift.res_count < gift.res_max_contributors ?
                                <Button variant="light" type="button" onClick={() => props.reserveGift(gift)} className="pull-left"> Dołącz </Button> :
                                <span className="btn btn-light disabled nohover pull-left nohover">Zarezerwuj</span>))}
                        <Button variant="link" type="button" onClick={() => props.seeMore(gift.gift_id)} className="pull-right"> Więcej </Button>
                    </Card.Footer>
                </Card>
            )
        });
    };

    const newGift = () => {
        return (<Card className="gift plus pt-4" onClick={props.newGift} key="button">
            <Card.Img variant="bottom" src={require("../img/plus.png")} />
            <span className="btn btn-secondary d-block nohover mb-4"> Dodaj nowy prezent</span>
        </Card>);
    };

    const newGiftMobile = () => {
        return (<Card className="gift plus-mobile mx-auto gift plus pt-4" onClick={props.newGift} key="button">
            <Card.Img variant="bottom" src={require("../img/plus.png")} />
            <span className="btn btn-secondary d-block nohover mb-4"> Dodaj nowy prezent</span>
        </Card>);
    };

    return (
        <div>
            <CardDeck>
                {props.isOrganiser ? (window.screen.width < 576 ? newGiftMobile() : newGift()) : undefined}
                {props.data === undefined ? undefined : printRow(props.data, window.screen.width < 576)}
            </CardDeck >
        </div>
    );
};
