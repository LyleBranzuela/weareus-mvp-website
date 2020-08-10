import "./MessageOfTheDay.css";
import React from "react";
import { Container } from "react-bootstrap";

class MessageOfTheDay extends React.Component {
  render() {
    return (
      <Container fluid>
        <p className="motdStyle">
          {this.props.motd}
        </p>
      </Container>
    );
  }
}

export default MessageOfTheDay;
