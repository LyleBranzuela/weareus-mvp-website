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
            {this.props.company_name}
          </Card.Subtitle>
          <Card.Text>
            {this.props.company_address1}
            <br />
            {this.props.company_address2}
            <span className="horizontal-line-card"></span>
            <a href="/#" id="purple-card-heading">
              {this.props.phone.slice(0, 3)} (0)
              {this.props.phone.slice(3, 5)} {this.props.phone.slice(5, 8)}{" "}
              {this.props.phone.slice(8)}
            </a>
            <span className="horizontal-line-card"></span>
            <a href="/#" id="purple-card-heading">
              {this.props.email}
            </a>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ContactCard;