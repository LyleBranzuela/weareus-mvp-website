import React, { useState } from "react";
import "./ProfileInformation.css";
import icon_diploma from "../../assets/icons/icon_diploma.svg";
import icon_certificate from "../../assets/icons/icon_certificate.svg";
import icon_memberships from "../../assets/icons/icon_memberships.svg";
import icon_accordion_arrow from "../../assets/icons/accordion_arrow.svg";
import icon_accordion_arrow_upwards from "../../assets/icons/accordion_arrow_upwards.svg";
import icon_accordion_arrow_purple from "../../assets/icons/accordion_arrow_purple.svg";
import icon_accordion_arrow_upwards_purple from "../../assets/icons/accordion_arrow_upwards_purple.svg";
import { Container, Row, Col, Accordion, Card, Button } from "react-bootstrap";
import ContactCard from "./ContactCard";
import ExpendableText from "./ExpendableText";

class ProfileInformation extends React.Component {
  render() {
    return (
      <Container fluid className="container-dimensions">
        <Row>
          <Col md={8} className="no-padding">
            {/* Practitioner Profile Image */}
            <img
              src={require("../../assets/images/placeholders/prac_profile_placeholder.jpg")}
              id="profile-image-frame"
              alt="profile image"
            />

            {/* Practitioner Name */}
            <h2 className="practitioner-title" id="practitioner-name">
              Atma Studio Yoga
              {/* Practitioner Business Logo Image */}
              <img
                src={require("../../assets/images/placeholders/prac_logo_placeholder.jpg")}
                alt="logo"
                class="practitioner-logo"
              />
            </h2>

            {/* Practitioner Specialty Category/ies */}

            <div id="category">
              <span id="category-text">Herbal Medicine, Massage, Reiki</span>
            </div>

            {/* Location including Suburb and City*/}
            <div id="location">
              <span id="suburb">Albany, </span>
              <span id="city"> Auckland</span>
            </div>
            <br />
            <br />
            <p className="box">Covered by ACC</p>
            <h5 className="practitioner-name" id="person-name">
              Name
            </h5>
          </Col>

          <Col md={4} className="contact-card-column">
            <ContactCard></ContactCard>
          </Col>
        </Row>
        <Row>
          <Col md={8} className="no-padding">
            {/* Practitioner "About" Section*/}

            {/* Read More button for practitioner description */}
            <Card className="practitioner-description-card">
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
            {/* END OF practitioner "About" Section */}

            {/* START OF Accordion Section */}
            <Container fluid className="accordion-section">
              <Accordion defaultAtionKey="0">
                {/* Specialties Accordion */}
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    Specialties
                    <img
                      src={icon_accordion_arrow}
                      className="arrow-position"
                    ></img>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    {/* Section containing Specialty categories */}
                    <Card.Body>
                      <ul className="accordion-content-list-style">
                        <li>
                          <h5>Item 1</h5>
                        </li>
                        <li>
                          <h5>Item 1</h5>
                        </li>
                        <li>
                          <h5>Item 1</h5>
                        </li>
                      </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                {/* END of Specialties section */}

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
                        className="accordion-content-list-style"
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

                {/* Training, Qualifications & Memberships Accordion */}
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="2">
                    Training, Qualifications & Memberships
                    <img
                      src={icon_accordion_arrow}
                      className="arrow-position"
                    ></img>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="2">
                    {/* Education (Diploma) sub-section */}
                    <Card.Body>
                      <h6 className="title-header">
                        <img
                          src={icon_diploma}
                          style={{ paddingRight: "5px" }}
                        ></img>
                        Diplomas
                      </h6>
                      <div className="font-body" id="education">
                        {/* Name of education provider */}
                        <span>International Institute of Reflexology</span>
                        <br />
                        {/* Name of education qualification name */}
                        <span>
                          Level 4 Anatomy & Physiology/Pathology (3 yrs)
                        </span>
                        <br />
                        <br />
                      </div>
                      {/* END OF Education (Diploma) section */}

                      {/* Certifications sub-section */}
                      <h6 className="title-header">
                        <img
                          src={icon_certificate}
                          style={{ paddingRight: "5px" }}
                        ></img>
                        Certificates
                      </h6>
                      {/* List of certifications achieved */}

                      <ul className="training-accordion-body-font">
                        <li>
                          How Reflexology Helps with Conception, Pregnancy &
                          Childbirth (3 yrs)
                        </li>
                        <li>Reflexology for the Me | Patient Cert</li>
                        <li>How Reflexology helps Cancer</li>
                        <li>Coastal Paramedic</li>
                        <li>Current First Aid</li>
                      </ul>
                      <br />

                      {/* Memberships sub-section*/}
                      <h6 className="title-header">
                        <img
                          src={icon_memberships}
                          style={{ paddingRight: "5px" }}
                        ></img>
                        Memberships
                      </h6>
                      <div className="font-body" id="memberships">
                        {/* Show REGULAR TEXT - IF link is NOT given */}
                        <a id="membership-no-link">
                          Reflexology Institute New Zealand
                        </a>
                        <br />
                        {/* SHOW LINK - IF the website is given */}
                        <a
                          href=""
                          style={{ color: "#79158f" }}
                          id="membership-link"
                        >
                          <u>National Health Practitioners of New Zealand</u>
                        </a>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProfileInformation;
