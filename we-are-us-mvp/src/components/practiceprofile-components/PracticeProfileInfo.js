import React from "react";
import "./PracticeProfileInfo.css";
import icon_accordion_arrow from "../../assets/icons/accordion_arrow.svg";
import { Container, Row, Col, Accordion, Card } from "react-bootstrap";
import OurSpecialists from "./OurSpecialists";
import ContactCard from "../for-profile-components/ContactCard";
import ExpendableText from "../for-profile-components/ExpendableText";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from "react-geocode";

class PracticeProfileInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      latitude: "",
      longitude: "",
    };
  }

  componentDidMount() {

    Geocode.setApiKey("AIzaSyCZh-PRfvNueE58KB6H1u8GN5QUxQ-Tt9s");

    const testAddress = "55 Wellesley Street East, Auckland CBD, Auckland 1010"; //Replace this with dynamic address

    Geocode.fromAddress(testAddress).then(
      response => {
        const { latResult, lngResult } = response.results[0].geometry.location;
        this.setState({
          latitude: latResult,
          longitude: lngResult
        })
      },
      error => {
        console.error(error);
      }
    );
  }


  render() {
    const mapStyles = {
      width: '100%',
      height: '400px',
    };



    return (
      <Container fluid className="container-dimensions">
        <Row>
          <Col lg={7} className="test">
            {/* Practice Profile Image */}
            <img
              src={require("../../assets/images/placeholders/prac_logo_placeholder.jpg")}
              id="logo-frame"
              alt="logo"
            />

            {/* Practitce Name */}
            <h2 className="practice-title" id="practice-name">
              Atma Studio Yoga
            </h2>

            {/* Practice Specialty Category/ies */}

            <div id="category">
              <span id="category-text">Herbal Medicine, Massage, Reiki</span>
            </div>

            {/* Location including Suburb and City*/}
            <div id="location">
              <span id="suburb">Albany, </span>
              <span id="city"> Auckland</span>
            </div>
            <br />

            <p id="covered-by-box">Covered by ACC</p>
          </Col>

          <Col lg={5} className="practice-contact-card-col">
            <ContactCard></ContactCard>
          </Col>
        </Row>
        <Row>
          <Col lg={7} className="info">
            {/* Practice "About" Section*/}

            {/* Read More button for practice description */}
            <Card className="practice-description-card">
              <Card.Body>
                <Card.Title>About</Card.Title>
                {/* Max Height by default is 145 */}
                {/* maxHeight will determine how much text is shown in the description */}
                {/* IF a description is longer than the height of the Card THEN a "Read More" button will appear */}
                <ExpendableText maxHeight={145}>
                  Understanding your body's responses and tension patterns can
                  help you understand the conscious choices you make and puts
                  you back in charge of your own well-being. Experience
                  day-to-day life in a positive, enjoyable and empowered way.
                  Using the nurtured touch of Reflexology, positive
                  reinforcement, sharing of knowledge, lifestyle support and a
                  deep understanding of how the nervous system works I can help
                  you achieve and maintain the best physical, mental and
                  emotional energy.
                  {/* Remove the below text to view the description WITHOUT the "Read More" button */}
                  Understanding your body's responses and tension patterns can
                  help you understand the conscious choices you make and puts
                  you back in charge of your own well-being. Experience
                  day-to-day life in a positive, enjoyable and empowered way.
                  Using the nurtured touch of Reflexology, positive
                  reinforcement, sharing of knowledge, lifestyle support and a
                  deep understanding of how the nervous system works I can help
                  you achieve and maintain the best physical, mental and
                  emotional energy.
                </ExpendableText>
              </Card.Body>
            </Card>
            {/* END OF practice "About" Section */}

            {/* START OF Accordion Section */}
            <Container fluid className="profile-accordion-section">
              <Accordion defaultAtionKey="0">
                {/* Services Accordion */}
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="1">
                    Services
                    <img
                      src={icon_accordion_arrow}
                      className="arrow-position"
                    ></img>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <ul
                        className="accordion-content-services"
                        id="services"
                      >
                        <li>
                          <h5>Reflexology</h5>
                        </li>
                        <li>
                          <h5>Reiki</h5>
                        </li>
                        <li>
                          <h5>Metamorphosis</h5>
                        </li>
                        <li>
                          <h5>Energy Balance</h5>
                        </li>
                      </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                {/* Google map */}
                <Card style={{ height: '40em' }}>
                  <Accordion.Toggle as={Card.Header} eventKey="2">
                    Location
                    <img
                      src={icon_accordion_arrow}
                      className="arrow-position"
                    ></img>

                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>

                      <Map
                        google={this.props.google}
                        zoom={15}
                        style={mapStyles}
                        initialCenter={{ lat: this.state.latitude, lng: this.state.longitude }}
                      >
                        <Marker position={{ lat: this.state.latitude, lng: this.state.longitude }}
                          icon={{ url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png" }} />
                      </Map>

                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                {/* Google map */}

              </Accordion>
            </Container>
          </Col>
          {/* Our Specialists */}
          <Col lg={5} className="our-specialists">
            <OurSpecialists></OurSpecialists>
          </Col>
        </Row>
        <br />
      </Container>
    );
  }
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyDrL-6gCrk9OQ_3l1k7BxAOPXcUIfU2xFo' })(PracticeProfileInfo);