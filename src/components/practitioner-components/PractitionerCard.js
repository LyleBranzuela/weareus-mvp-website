import "./PractitionerCard.css";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class PractitionerCard extends React.Component {
  render() {
    return (
      <Card border="light" className="pracCardStyle">
        <Card.Img
          alt={this.props.company_name}
          variant="top"
          src={
            this.props.hasCoverImages
              ? this.props.cover_image
              : require("../../assets/images/placeholders/" +
                  this.props.cover_image)
          }
        />
        <Card.Body>
          <Link to={`/practitioner-profile/${this.props.company_id}`}>
            <Card.Title>{this.props.company_name}</Card.Title>
          </Link>
          <Card.Subtitle className="mb-4 text-muted">
            {this.props.address}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }
}

export default PractitionerCard;
