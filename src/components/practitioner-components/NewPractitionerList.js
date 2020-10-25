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

    // Map all of the Practitioners
    let newPracList = [];
    let newPractitioners = this.props.newPractitioners;
    if (newPractitioners) {
      // Randomize Practitioners
      for (let i = newPractitioners.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = newPractitioners[i];
        newPractitioners[i] = newPractitioners[j];
        newPractitioners[j] = temp;
      }
      newPracList = newPractitioners.map((practitioner) => {
        // Image URL with a Placeholder if doesnt exist (Only for Displaying Purposes)
        let image_url;
        let hasCoverImages = false;
        if (!practitioner.cover_image) {
          hasCoverImages = false;
          image_url = "listing_placeholder_1.jpg";
        } else {
          hasCoverImages = true;
          image_url = practitioner.cover_image;
        }
        if (isMobile) {
          return (
            <Carousel.Item key={practitioner.company_name}>
              <NewPractitionerCard
                key={practitioner.company_name}
                company_id={practitioner.company_id}
                company_name={practitioner.company_name}
                hasCoverImages={hasCoverImages}
                cover_image={image_url}
                address={`${practitioner.suburb}, ${practitioner.region_name}`}
                about={practitioner.about}
                services={practitioner.services}
              />
            </Carousel.Item>
          );
        } else {
          return (
            <NewPractitionerCard
              key={practitioner.company_name}
              company_id={practitioner.company_id}
              company_name={practitioner.company_name}
              hasCoverImages={hasCoverImages}
              cover_image={image_url}
              address={`${practitioner.suburb}, ${practitioner.region_name}`}
              about={practitioner.about}
              services={practitioner.services}
            />
          );
        }
      });
    }

    // Show All Practitioners Button
    let showAllButton;
    if (!this.props.showAll) {
      showAllButton = <Link to="practitioner-list">Show All</Link>;
    }

    if (isMobile) {
      // Mobile version
      return (
        <Container fluid className="newPracContainerStyle">
          <Container className="newPracListStyle">
            <p id="pracListHeader">New Listed Practicioners</p>
            <Carousel className="newPracCarouselStyle">
              {newPracList.slice(0, 3)}
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
            <CardDeck>{newPracList.slice(0, 3)}</CardDeck>
            <br />
            {/** Show all New Practitioners */}
            {showAllButton}
          </Container>
        </Container>
      );
    }
  }
}

export default NewPractitionerList;
