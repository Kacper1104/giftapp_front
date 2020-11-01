import React, { Component } from "react";
import {Button, Modal } from "react-bootstrap";
import "../custom.scss";

class MyModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            show: props.show,
            title: props.title,
            body: props.body
        };
    }

    componentDidUpdate(props){
      if(props.show !== this.props.show || props.title !== this.props.title || props.body !== this.props.body){
        this.setState({
          show: this.props.show,
          title: this.props.title,
          body: this.props.body
        });
      }
    }

render() {
    return (
        <Modal
          show={this.state.show}
          onHide={() => this.setState({show:false})}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.body}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => {this.setState({show:false}); this.props.callback();}}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
    );}
}
export default MyModal;