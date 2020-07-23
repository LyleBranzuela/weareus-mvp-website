import "./NewPractitionerList.css";
import React from "react";
import NewPractitionerCard from "./NewPractitionerCard";
import { Container, CardDeck } from "react-bootstrap";

class NewPractitionerList extends React.Component {
  render() {
    return (
      <Container fluid>
        <Container className="practitionerListStyle">
          <h4>New Listed Practicioners</h4>
          <CardDeck>
            <NewPractitionerCard
              practitionerImage="listing_placeholder_1.jpg"
              practitionerCompany="Walk In Light"
              practitionerLocation="Albany, Auckland"
              practitionerDesc="
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <NewPractitionerCard
              practitionerImage="listing_placeholder_2.jpg"
              practitionerCompany="Walk In Light"
              practitionerLocation="Albany, Auckland"
              practitionerDesc="
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <NewPractitionerCard
              practitionerImage="listing_placeholder_3.jpg"
              practitionerCompany="Walk In Light"
              practitionerLocation="Albany, Auckland"
              practitionerDesc="
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
          </CardDeck>
        </Container>
      </Container>
    );
  }
}

export default NewPractitionerList;
