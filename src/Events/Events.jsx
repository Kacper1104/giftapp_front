import React, { Component } from "react";
import { Button, ButtonGroup, PageHeader } from "react-bootstrap";
import User from "../ViewModel/User";
import Event from "./Event"
import NewEvent from "./NewEvent";
import { EventsList } from "./EventsList";
import JoinEvent from "./JoinEvent";
//import MyEvent from"../ViewModel/MyEvent";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 1,
      pageNumber: 1,
      pageSize: 100,
      eventSelected: false,
      eventId: undefined,
      showForm: false,
      joinEvent: false
    };

    this.fetchData.bind(this);
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
    user.fetchEvents(this.state.offset, this.state.pageSize).then(json => !json ? window.location.href = "/login" : this.setState({ data: json, joinEvent: false }));
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return !this.state.showForm ? (this.state.eventSelected === true ? <Event eventId={this.state.eventId} isOrganiser={this.state.isOrganiser} /> : (
      <div className="body-form">
        <PageHeader>
          Moje wydarzenia <small> kliknij "dołącz do wydarzenia" i wpisz swój kod lub wybierz wydarzenie z listy poniżej </small>
        </PageHeader>;
        {this.state.joinEvent ?
          <JoinEvent onJoin={() => this.fetchData()} onCancel={() => this.setState({ joinEvent: false })} />
          :
          <ButtonGroup vertical>
            <Button className="pull-left list-button" variant="success" onClick={() => this.setState({ joinEvent: true })} >Dołącz do wydarzenia</Button>
            {//<Button className="pull-left list-button" variant="primary" onClick={() => this.setState({ showForm: true })} >Utwórz nowe wydarzenie</Button>
            }
          </ButtonGroup>}
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
      />
  }
}

export default Events;
