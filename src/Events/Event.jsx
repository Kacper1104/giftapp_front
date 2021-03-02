import React, { Component } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import GiftsList from "../Gifts/GiftsList";
import "../custom.scss";
import MyEvent from "../ViewModel/MyEvent";
import { CodesList } from "./CodesList";
import NewCode from "./NewCode";
import { isMobile } from "react-device-detect";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      codes: undefined,
      showForm: false
    };
  }

  fetchData = () => {
    const event = new MyEvent(this.props.eventId, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    event.getGifts().then(json => !json ? window.location.href = "/login" : this.setState({ data: json }));
  }

  fetchCodes = () => {
    const event = new MyEvent(this.props.eventId, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    event.getCodes().then(json => !json ? window.location.href = "/login" : this.setState({ codes: json, showForm: false }));
  }

  componentDidMount() {
    this.fetchData();
    if (this.props.isOrganiser)
      this.fetchCodes();
  }

  reserveGift(gift, isGroup, phone, number, description) {
    const max_contributors = gift.is_reserved ?
      gift.res_max_contributors :
      (isGroup ?
        number :
        1);
    //console.log(description);
    gift.reserve(gift.gift_id, gift.is_reserved ? gift.res_max_contributors : max_contributors, phone, this.props.eventId, description).then(() => this.fetchData());
  }

  render() {
    return (
      <div className="body-form">
        {this.props.isOrganiser ?
          <Tabs defaultActiveKey="gifts" id="uncontrolled-tab" style={{ "margin-bottom": "10px" }}>
            <Tab eventKey="gifts" title="Prezenty">
              <GiftsList
                data={this.state.data}
                reserveGift={(gift, isGroup, phone, number, description) => this.reserveGift(gift, isGroup, phone, number, description)}
                isOrganiser={this.props.isOrganiser}
                refreshList={this.fetchData}
                eventId={this.props.eventId}
              />
            </Tab>
            <Tab eventKey="invitations" title="Goście">
              <div className="body-form">
                {this.state.showForm ?
                  <NewCode
                    eventId={this.props.eventId}
                    handleCreate={() => { this.fetchCodes() }}
                    onCancel={() => this.setState({ showForm: false })}
                  />
                  :
                  <Button className={isMobile ? "list-button btn-block" : "pull-right list-button"} variant="success" onClick={() => this.setState({ showForm: true })} > Wygeneruj kod dostępu </Button>}
                <CodesList
                  data={this.state.codes}
                />
              </div>
            </Tab>
          </Tabs>
          :
          <GiftsList
            data={this.state.data}
            reserveGift={(gift, isGroup, phone, number, description) => this.reserveGift(gift, isGroup, phone, number, description)}
            isOrganiser={this.props.isOrganiser}
            refreshList={this.fetchData}
            eventId={this.props.eventId}
          />
        }
      </div>
    );
  }
}

export default Event;
