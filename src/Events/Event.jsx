import React, { Component } from "react";
import { GiftsList } from "../Gifts/GiftsList";
import "../custom.scss";
import MyEvent from "../ViewModel/MyEvent";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = { data: undefined };
  }

  fetchData() {
    const event = new MyEvent(this.props.eventId, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    event.getGifts().then(json => !json ? window.location.href = "/login" : this.setState({ data: json }));
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="body-form">
        <GiftsList
          data={this.state.data}
          reserveGift={(gift) => console.log("reservation of gift: " + gift.gift_name)}
          seeMore={(id) => console.log("See more for gift id: " + id)}
          newGift={() => console.log("Create new gift")}
          isOrganiser={this.props.isOrganiser}
        />
      </div>
    );
  }
}

export default Event;
