import "./MessageOfTheDay.css";
import React from "react";
import { Container } from "react-bootstrap";

class MessageOfTheDay extends React.Component {
  render() {
    return (
      <Container fluid>
        <p className="motdStyle">
          <strong>We are Us</strong> connects you with health, wellness, and
          self-improvement <br /> practitioners throughout New Zealand.
        </p>
      </Container>
    );
  }
}

export default MessageOfTheDay;
