import React, { Component } from 'react';
import { Card, CardDeck, Button, Badge } from "react-bootstrap";
import Gift from "../ViewModel/Gift"
import ReserveGift from './ReserveGift';
import GiftCard from './GiftCard';
import NewGift from "./NewGift";
import { isMobile } from "react-device-detect";

class GiftList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createForm: false
        };
    }

    setClickedId = (gift) => {
        this.setState({ clickedId: gift.gift_id });
    }

    printRow = (data) => {
        return data.map((row, index) => {
            const gift = new Gift(row.gift_id, row.gift_name, row.gift_description,
                row.gift_changed_date, row.res_max_contributors, row.res_changed_date, row.is_reserved, row.is_user_res, row.res_count, row.gift_picture); //deconstruction
            return (
                this.state.clickedId === gift.gift_id ?
                    <ReserveGift gift={gift} reserveGift={(gift, isGroup, phone, number) => { this.setState({ clickedId: undefined }); this.props.reserveGift(gift, isGroup, phone, number); }} cancelReservation={() => this.setState({ clickedId: undefined })} /> :
                    <GiftCard key={gift.gift_id} setClickedId={() => this.setClickedId(gift)} gift={gift} isOrganiser={this.props.isOrganiser} refreshList={this.props.refreshList}> </GiftCard >
            )
        });
    };

    onNewGiftClick = () => {
        this.setState({ createForm: true });
    }

    handleCreate = () => {
        this.props.refreshList();
        this.setState({ createForm: false });
    }

    onCancel = () => {
        this.setState({ createForm: false });
    }

    newGift = () => {
        return (this.state.createForm ?
            <NewGift eventId={this.props.eventId} handleCreate={this.handleCreate} onCancel={this.onCancel} /> :
            <Card className={isMobile ? "gift plus-mobile mx-auto gift plus pt-4" : "gift plus pt-4"} onClick={this.onNewGiftClick} key="button" >
                <Card.Img variant="bottom" src={require("../img/plus.png")} />
                <span className="btn btn-secondary d-block nohover mb-4"> Dodaj nowy prezent</span>
            </Card >);
    };

    render() {
        return (
            <div>
                <CardDeck>
                    {this.props.isOrganiser ? this.newGift() : undefined}
                    {this.props.data === undefined ? undefined : this.printRow(this.props.data)}
                </CardDeck >
            </div>
        );
    }
}

export default GiftList;
