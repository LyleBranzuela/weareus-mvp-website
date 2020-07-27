import "./PractitionerCard.css";
import React from "react";
import { Card } from "react-bootstrap";

class PractitionerCard extends React.Component {
  render() {
    return (
      <Card border="light" className="pracCardStyle">
        <Card.Img
          alt={this.props.practitionerCompany}
          variant="top"
          src={require("../../assets/images/placeholders/" +
            this.props.practitionerImage)}
        />
        <Card.Body>
          <Card.Title>{this.props.practitionerName}</Card.Title>
          <Card.Subtitle className="mb-4 text-muted">
            {this.props.practitionerLocation}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }
}

export default PractitionerCard;
