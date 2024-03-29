import "./PractitionerList.css";
import React from "react";
import PractitionerCard from "./PractitionerCard";
import { Container, CardDeck, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

class PractitionerList extends React.Component {
  render() {
    return (
      <Container fluid className="pracContainerStyle">
        {/** Card Deck for all Practitioner Cards */}
        <Container className="pracListStyle">
          <h4>Practitioners</h4>
          <CardDeck className="pracListDeckStyle">
            <Row>
              <PractitionerCard
                practitionerName="Body Mechanics Orthopedic Massage"
                practitionerImage="listing_placeholder_1.jpg"
                practitionerLocation="Albany, Auckland"
              />
              <PractitionerCard
                practitionerName="Horizon Wellbeing"
                practitionerLocation="Albany, Auckland"
                practitionerImage="listing_placeholder_1.jpg"
              />
              <PractitionerCard
                practitionerName="Sarah Savage Massage"
                practitionerLocation="Albany, Auckland"
                practitionerImage="listing_placeholder_3.jpg"
              />
              <PractitionerCard
                practitionerName="Sarah Savage Massage"
                practitionerLocation="Albany, Auckland"
                practitionerImage="listing_placeholder_1.jpg"
              />
              <PractitionerCard
                practitionerName="Paul Labrecque Salon & Spa"
                practitionerLocation="Albany, Auckland"
                practitionerImage="listing_placeholder_2.jpg"
              />
            </Row>
            <Row>
              <PractitionerCard
                practitionerName="Mother Health"
                practitionerLocation="Albany, Auckland"
                practitionerImage="listing_placeholder_3.jpg"
              />
              <PractitionerCard
                practitionerName="D'mai Urban Spa"
                practitionerLocation="Albany, Auckland"
                practitionerImage="listing_placeholder_1.jpg"
              />
              <PractitionerCard
                practitionerName="Great Jones Spa"
                practitionerLocation="Albany, Auckland"
                practitionerImage="listing_placeholder_2.jpg"
              />
              <PractitionerCard
                practitionerName="Refresh Body"
                practitionerLocation="Albany, Auckland"
                practitionerImage="listing_placeholder_3.jpg"
              />
              <PractitionerCard
                practitionerName="Escape Away Massage   "
                practitionerLocation="Albany, Auckland"
                practitionerImage="listing_placeholder_1.jpg"
              />
            </Row>
          </CardDeck>
          <br />
          {/** Show all New Practitioners */}
          <Link to="practitioner-list">Show All (12)</Link>
        </Container>
      </Container>
    );
  }
}

export default PractitionerList;
