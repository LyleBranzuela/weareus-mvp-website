import React from "react";
import "./ContactCard.css";
import { Card } from "react-bootstrap";

class ContactCard extends React.Component {
  render() {
    return (
      <Card className="contact-card-box">
        <Card.Body>
          <Card.Title>Contact Details</Card.Title>
          <Card.Subtitle>
            {/* Practitioner Name */}
            Atma Studio Yoga
          </Card.Subtitle>
          <Card.Text>
            Name
            <br />
            184 Beech Road, Diary Flat,
            <br />
            RD4 Albany, Auckland 0794
            <hr />
            <h5 id="purple-card-heading">+64 (0)21 754 459</h5>
            <hr />
            <h5 id="purple-card-heading">gill@sbsltd.co.nz</h5>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ContactCard;
