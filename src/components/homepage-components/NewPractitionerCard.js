import "./NewPractitionerCard.css";
import React from "react";
import { Card } from "react-bootstrap";

class NewPractitionerCard extends React.Component {
  render() {
    return (
      <Card className="listingCardStyle">
        <Card.Img
          variant="top"
          src={require("../../assets/images/placeholders/" +
            this.props.practitionerImage)}
        />
        <Card.Body>
          <Card.Title>{this.props.practitionerCompany}</Card.Title>
          <Card.Subtitle className="mb-4 text-muted">
            {this.props.practitionerLocation}
          </Card.Subtitle>
          <Card.Text>{this.props.practitionerDesc}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default NewPractitionerCard;
