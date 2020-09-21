import "./NewPractitionerList.css";
import React from "react";
import NewPractitionerCard from "./NewPractitionerCard";
import { Container, CardDeck, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

class NewPractitionerList extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;

    if (isMobile) {
      // Mobile version
      return (
        <Container fluid className="newPracContainerStyle">
          <Container className="newPracListStyle">
            <p id="pracListHeader">New Listed Practicioners</p>
            <Carousel className="newPracCarouselStyle">
              <Carousel.Item>
                <NewPractitionerCard
                  practitionerImage="listing_placeholder_1.jpg"
                  practitionerName="Walk In Light"
                  practitionerCardType="Massage, Reiki"
                  practitionerLocation="Albany, Auckland"
                  practitionerDesc="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
              </Carousel.Item>
              <Carousel.Item>
                <NewPractitionerCard
                  practitionerImage="listing_placeholder_2.jpg"
                  practitionerName="Infinite Well Being"
                  practitionerCardType="Massage, Reiki"
                  practitionerLocation="Albany, Auckland"
                  practitionerDesc="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
              </Carousel.Item>
              <Carousel.Item>
                <NewPractitionerCard
                  practitionerImage="listing_placeholder_3.jpg"
                  practitionerName="Judith Yasnik"
                  practitionerCardType="Herbal Medicine, Massage, Reiki"
                  practitionerLocation="Albany, Auckland"
                  practitionerDesc="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
              </Carousel.Item>
            </Carousel>
          </Container>
        </Container>
      );
    } else {
      return (
        <Container fluid className="newPracContainerStyle">
          <Container className="newPracListStyle">
            <h4>New Listed Practicioners</h4>
            {/** Card Deck for all New Practitioner Cards */}
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
            {/** Show all New Practitioners */}
            <Link to="practitioner-list">Show All (5)</Link>
          </Container>
        </Container>
      );
    }
  }
}

export default NewPractitionerList;
