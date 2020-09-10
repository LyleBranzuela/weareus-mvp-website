import "./MessageOfTheDay.css";
import React from "react";
import { Container } from "react-bootstrap";

class MessageOfTheDay extends React.Component {
  render() {
    return (
      <Container fluid>
        {/** Component that generates a simple Message of The Day Layout */}
        <p className="motdStyle">{this.props.motd}</p>
      </Container>
    );
  }
}

export default MessageOfTheDay;
