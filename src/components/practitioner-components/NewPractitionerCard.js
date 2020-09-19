import "./NewPractitionerCard.css";
import React from "react";
import { Card } from "react-bootstrap";

class NewPractitionerCard extends React.Component {
  render() {
    return (
      <Card className="newPracCardStyle">
        <Card.Img
          alt={this.props.practitionerCompany}
          variant="top"
          src={require("../../assets/images/placeholders/" +
            this.props.practitionerImage)}
        />
        <Card.ImgOverlay>
          <span id="newPracCardType">{this.props.practitionerCardType}</span>
        </Card.ImgOverlay>
        <Card.Body>
          <Card.Title>{this.props.practitionerName}</Card.Title>
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
