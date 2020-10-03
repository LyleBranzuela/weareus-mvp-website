import React from "react";
import "./PracticeContactCard.css";
import { Card } from "react-bootstrap";

class PracticeContactCard extends React.Component {
  render() {
    return (
      <Card className="contact-card-box">
        <Card.Body>
          <Card.Title>Contact Details</Card.Title>
          <Card.Text>
            Atma Studio Yoga
            <br/>
            184 Beech Road, Diary Flat,
            <br />
            RD4 Albany, Auckland 0794
            <hr />
            <h5 id="purple-card-heading">+64 (0)21 754 459</h5>
            <hr />
            <h5 id="purple-card-heading">bookl@atmastudioyoga.co.nz</h5>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default PracticeContactCard;
