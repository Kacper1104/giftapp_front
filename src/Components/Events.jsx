import React, { Component } from "react";
import { Table } from "react-bootstrap";
import User from "../ViewModel/User";
import MyEvent from"../ViewModel/MyEvent";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 1,
      pageNumber: 1,
      pageSize: 10
    };
  }

  fetchData(pageSize, offset){
    const user = new User();
    const events = user.fetchEvents(offset, pageSize);
    console.log(events);
  //   return events.map((event, index) => {
  //     const { id, name, start_date, role } = event //destructuring
  //     return (
  //        <tr key={id}>
  //           <td>{id}</td>
  //           <td>{name}</td>
  //           <td>{start_date}</td>
  //           <td>{role}</td>
  //        </tr>
  //     )
  //  })
  };

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            {this.fetchData(this.state.pageSize, this.state.offset)}
          </tr>
        </thead>
        <tbody>
        </tbody>
      </Table>
    );
  }
}

export default Events;
