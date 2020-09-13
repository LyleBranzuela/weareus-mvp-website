import "./PractitionerList.css";
import React from "react";
import PractitionerCard from "./PractitionerCard";
import { Container, CardDeck, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class PractitionerList extends React.Component {
  render() {
    // Map all of the Practitioners
    let practitionerList = [];
    let practitioners = this.props.practitioners;
    if (practitioners) {
      practitionerList = practitioners.map((practitioner) => {
        // Temporary Image URL until S3 is setup
        let image_url = "listing_placeholder_2.jpg";
        if (!image_url) {
          image_url = "listing_placeholder_2.jpg";
        }
        return (
          <PractitionerCard
            practitionerName={practitioner.company_name}
            practitionerImage={image_url}
            practitionerLocation={`${practitioner.suburb}, ${practitioner.region_name}`}
          />
        );
      });
    }
    return (
      <Container fluid className="pracContainerStyle">
        {/** Card Deck for all Practitioner Cards */}
        <Container className="pracListStyle">
          <h4>Practitioners</h4>
          <CardDeck className="pracListDeckStyle">
            <Row>{practitionerList.slice(0, 5)}</Row>
            <Row>{practitionerList.slice(5, 10)}</Row>
          </CardDeck>
          <br />
          {/** Show all New Practitioners */}
          <Link to="practitioner-list">Show All ({practitionerList.length})</Link>
        </Container>
      </Container>
    );
  }
}

export default PractitionerList;
