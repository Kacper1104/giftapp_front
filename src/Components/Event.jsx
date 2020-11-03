import React, { Component } from "react";
import { Button, Card, CardDeck } from "react-bootstrap"
import "../custom.scss";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    };
  }

  printList() {
    return this.state.data.map((row, index) => {
      const { id } = row //destructuring
      return (
        <Card>
          <Card.Img variant="top" src={require("../img/holder.bmp")} />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
          </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="light" type="button"> Zarezerwuj </Button>
            <Button variant="link" type="button"> Więcej </Button>
          </Card.Footer>
        </Card>
      )
    });
  };

  render() {
    return (
      <div className="body-form">
        < CardDeck >
          {this.printList()}
        </CardDeck >
      </ div >
    );
  }
}

export default Event;
