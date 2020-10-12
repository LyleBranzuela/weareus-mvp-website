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
            key={practitioner.company_name}
            company_id={practitioner.company_id}
            company_name={practitioner.company_name}
            cover_image={image_url}
            address={`${practitioner.suburb}, ${practitioner.region_name}`}
          />
        );
      });
    }

    // Show All Practitioners Button
    let showAllButton;
    if (!this.props.showAll) {
      showAllButton = (
        <Link to="practitioner-list">Show All ({practitionerList.length})</Link>
      );
    }
    return (
      <Container
        fluid
        className="pracContainerStyle"
        style={{ backgroundColor: this.props.showAll ? "white" : "#F3F1F3" }}
      >
        {/** Card Deck for all Practitioner Cards */}
        <Container className="pracListStyle">
          <h4>Practitioners</h4>
          <CardDeck className="pracListDeckStyle">
            {/* Render all Practitioners based if it should be showing all or not */}
            {this.props.showAll ? (
              <Row>
                {practitionerList.map((practitioner, index) => {
                  return (
                    <Col key={index} sm={3}>
                      {practitioner}
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <div>
                <Row>{practitionerList.slice(0, 5)}</Row>
                <Row>{practitionerList.slice(5, 10)}</Row>
              </div>
            )}
          </CardDeck>
          <br />
          {showAllButton}
        </Container>
      </Container>
    );
  }
}

export default PractitionerList;
