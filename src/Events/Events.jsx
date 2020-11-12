import React, { Component } from "react";
import { Button } from "react-bootstrap";
import User from "../ViewModel/User";
import Event from "./Event"
import NewEvent from "./NewEvent";
import { EventsList } from "./EventsList";
//import MyEvent from"../ViewModel/MyEvent";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 1,
      pageNumber: 1,
      pageSize: 10,
      eventSelected: false,
      eventId: undefined,
      showForm: false
    };
  }

  selectEvent(id, isOrganiser) {
    this.setState(
      {
        eventSelected: true,
        eventId: id,
        isOrganiser: isOrganiser
      });
  }

  fetchData() {
    const user = new User();
    user.fetchEvents(this.state.offset, this.state.pageSize).then(json => !json ? window.location.href = "/login" : this.setState({ data: json }));
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return !this.state.showForm ? (this.state.eventSelected === true ? <Event eventId={this.state.eventId} isOrganiser={this.state.isOrganiser} /> : (
      <div className="body-form">
        <Button className="pull-right list-button" variant="success" onClick={() => this.setState({ showForm: true })} >Utwórz nowe wydarzenie</Button>
        <EventsList
          data={this.state.data}
          callback={(id, isOrganiser) => this.selectEvent(id, isOrganiser)}
        />
      </div>)
    ) : <NewEvent
        onCreate={() => {
          this.setState({ showForm: false });
          this.fetchData();
        }}
        onCancel={() => this.setState({ showForm: false })}
      />;
  }
}

export default Events;
