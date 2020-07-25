import "./NewPractitionerList.css";
import React from "react";
import NewPractitionerCard from "./NewPractitionerCard";
import { Container, CardDeck } from "react-bootstrap";

class NewPractitionerList extends React.Component {
  render() {
    return (
      <Container fluid className="practitionerContainerStyle">
        <Container className="practitionerListStyle">
          <h4>New Listed Practicioners</h4>
          <CardDeck>
            <NewPractitionerCard
              practitionerCardType="Massage, Reiki"
              practitionerImage="listing_placeholder_1.jpg"
              practitionerName="Walk In Light"
              practitionerLocation="Albany, Auckland"
              practitionerDesc="
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <NewPractitionerCard
              practitionerCardType="Massage, Reiki"
              practitionerImage="listing_placeholder_2.jpg"
              practitionerName="Infinite Well Being"
              practitionerLocation="Albany, Auckland"
              practitionerDesc="
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <NewPractitionerCard
              practitionerCardType="Herbal Medicine, Massage, Reiki"
              practitionerImage="listing_placeholder_3.jpg"
              practitionerName="Judith Yasnik"
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
