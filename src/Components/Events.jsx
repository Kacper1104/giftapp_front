import React, { Component } from "react";
import { Table, Alert, Button } from "react-bootstrap";
import User from "../ViewModel/User";
import Event from "./Event"
import NewEvent from "./NewEvent";
//import MyEvent from"../ViewModel/MyEvent";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 1,
      pageNumber: 1,
      pageSize: 10,
      eventSelected: false,
      eventId: undefined
    };
  }

  printRow() {
    return this.state.data.map((event, index) => {
      console.log(event);
      const { id, name, start_date, role } = event //destructuring
      return (
        <tr key={id} onClick={() => this.setState({ eventSelected: true, eventId: id })}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{new Date(start_date).toLocaleDateString()}</td>
          <td>{role}</td>
        </tr>
      )
    });
  };

  fetchData() {
    const user = new User();
    user.fetchEvents(this.state.offset, this.state.pageSize).then(json => !json ? window.location.href = "/login" : this.setState({ data: json }));
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return this.state.eventSelected === true ? <Event id={this.state.eventId} /> : (
      <div className="body-form">
        <Button className="pull-right list-button" variant="success" >Utwórz nowe wydarzenie</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>id</td>
              <td>name</td>
              <td>date</td>
              <td>role</td>
            </tr>
          </thead>
          <tbody>
            {this.state.data === undefined ? undefined : this.printRow()}
          </tbody>
        </Table>
        {!this.state.data || this.state.data.length === 0 ? <p style={{ textAlign: "center" }}>Nie masz żadnych wydarzeń.</p> : undefined}
        <NewEvent />
      </div>
    );
  }
}

export default Events;
