import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import GiftsList from "../Gifts/GiftsList";
import "../custom.scss";
import MyEvent from "../ViewModel/MyEvent";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    };
  }

  fetchData = () => {
    const event = new MyEvent(this.props.eventId, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    event.getGifts().then(json => !json ? window.location.href = "/login" : this.setState({ data: json }))
  }

  componentDidMount() {
    this.fetchData();
  }

  reserveGift(gift, isGroup, phone, number) {
    const max_contributors = gift.is_reserved ?
      gift.res_max_contributors :
      (isGroup ?
        number :
        1);
    gift.reserve(gift.gift_id, gift.is_reserved ? gift.res_max_contributors : max_contributors, phone, this.props.eventId).then(() => this.fetchData());
  }

  render() {
    return (
      <div className="body-form">
        {this.props.isOrganiser ?
          <Tabs defaultActiveKey="gifts" id="uncontrolled-tab">
            <Tab eventKey="gifts" title="Prezenty">
              <GiftsList
                data={this.state.data}
                reserveGift={(gift, isGroup, phone, number) => this.reserveGift(gift, isGroup, phone, number)}
                isOrganiser={this.props.isOrganiser}
                refreshList={this.fetchData}
                eventId={this.props.eventId}
              />
            </Tab>
            <Tab eventKey="invitations" title="Goście">
              {/* <GiftsList
                data={this.state.data}
                reserveGift={(gift, isGroup, phone, number) => this.reserveGift(gift, isGroup, phone, number)}
                isOrganiser={this.props.isOrganiser}
                refreshList={this.fetchData}
                eventId={this.props.eventId}
              /> */}
            </Tab>
          </Tabs>
          :
          <GiftsList
            data={this.state.data}
            reserveGift={(gift, isGroup, phone, number) => this.reserveGift(gift, isGroup, phone, number)}
            isOrganiser={this.props.isOrganiser}
            refreshList={this.fetchData}
            eventId={this.props.eventId}
          />}
      </div>
    );
  }
}

export default Event;
