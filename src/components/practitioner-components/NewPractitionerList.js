import "./NewPractitionerList.css";
import React from "react";
import NewPractitionerCard from "./NewPractitionerCard";
import { Container, CardDeck } from "react-bootstrap";

class NewPractitionerList extends React.Component {
  render() {
    return (
      <Container fluid className="newPracContainerStyle">
        <Container className="newPracListStyle">
          <h4>New Listed Practicioners</h4>
          <CardDeck>
            <NewPractitionerCard
              practitionerImage="listing_placeholder_1.jpg"
              practitionerName="Walk In Light"
              practitionerCardType="Massage, Reiki"
              practitionerLocation="Albany, Auckland"
              practitionerDesc="
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <NewPractitionerCard
              practitionerImage="listing_placeholder_2.jpg"
              practitionerName="Infinite Well Being"
              practitionerCardType="Massage, Reiki"
              practitionerLocation="Albany, Auckland"
              practitionerDesc="
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <NewPractitionerCard
              practitionerImage="listing_placeholder_3.jpg"
              practitionerName="Judith Yasnik"
              practitionerCardType="Herbal Medicine, Massage, Reiki"
              practitionerLocation="Albany, Auckland"
              practitionerDesc="
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
          </CardDeck>
          <br />
          <a href="">Show All (5)</a>
        </Container>
      </Container>
    );
  }
}

export default NewPractitionerList;
