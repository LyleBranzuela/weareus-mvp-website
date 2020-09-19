import React from "react";
import "./ProfileInformation.css";
import icon_diploma from "../../assets/icons/icon_diploma.svg";
import icon_certificate from "../../assets/icons/icon_certificate.svg";
import icon_memberships from "../../assets/icons/icon_memberships.svg";
import icon_accordion_arrow from "../../assets/icons/accordion_arrow.svg";
import icon_accordion_arrow_upwards from "../../assets/icons/accordion_arrow_upwards.svg";
import icon_accordion_arrow_purple from "../../assets/icons/accordion_arrow_purple.svg";
import icon_accordion_arrow_upwards_purple from "../../assets/icons/accordion_arrow_upwards_purple.svg";
import { Container, Row, Col, Accordion, Card } from "react-bootstrap";
import ContactCard from "./ContactCard";

class ProfileInformation extends React.Component {
  render() {
    return (
      <Container fluid className="container-dimensions">
        <Row>
          <Col md={8} className="non-padding">
            {/* Practitioner Profile Image */}
            <img
              src={require("../../assets/images/placeholders/prac_profile_placeholder.jpg")}
              id="profile-image-frame"
              alt="profile image"
            />

            {/* Practitioner Business Name */}
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

            {/* Location */}
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
          <Col md={8} className="non-padding">
            {/* About us description */}
            <h5 className="title-header">About</h5>
            <p className="font-body" id="about">
              Understanding your body's responses and tension patterns can help
              you understand the conscious choices you make and puts you back in
              charge of your own well-being. Experience day-to-day life in a
              positive, enjoyable and empowered way. Using the nurtured touch of
              Reflexology, positive reinforcement, sharing of knowledge,
              lifestyle support and a deep understanding of how the nervous
              system works I can help you achieve and maintain the best
              physical, mental and emotional energy.
            </p>

            <div className="read-more-button">
              <span>
                Read More{" "}
                <img
                  src={icon_accordion_arrow_purple}
                  className="read-more-arrow"
                ></img>
              </span>
            </div>

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
                    <Card.Body>Item 1</Card.Body>
                  </Accordion.Collapse>
                </Card>

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
                      <img
                        src={icon_accordion_arrow}
                        className="arrow-position"
                      ></img>

                      <ul className="service-list-style" id="services">
                        <li>
                          <h5>Reflexology</h5>
                          {/* {this.props.test} */}
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
                    <Card.Body>
                      <h6 className="title-header">
                        <img
                          src={icon_diploma}
                          style={{ paddingRight: "5px" }}
                        ></img>
                        Diplomas
                      </h6>
                      <div className="font-body" id="education">
                        <span>International Institute of Reflexology</span>
                        <br />
                        <span>
                          Level 4 Anatomy & Physiology/Pathology (3 yrs)
                        </span>
                        <br />
                        <br />
                      </div>

                      {/* Certifications/Qualifications Section */}
                      <h6 className="title-header">
                        <img
                          src={icon_certificate}
                          style={{ paddingRight: "5px" }}
                        ></img>
                        Certificates
                      </h6>
                      <div className="font-body" id="certificates">
                        <span>
                          How Reflexology Helps with Conception, Pregnancy &
                          Childbirth (3 yrs)
                        </span>
                        <br />
                        <span>Reflexology for the Me | Patient Cert</span>
                        <br />
                        <span>How Reflexology helps Cancer</span>
                        <br />
                        <span>Coastal Paramedic</span>
                        <br />
                        <span>Current First Aid</span>
                        <br />
                        <br />
                      </div>

                      {/* Organisation memberships */}
                      <h6 className="title-header">
                        <img
                          src={icon_memberships}
                          style={{ paddingRight: "5px" }}
                        ></img>
                        Memberships
                      </h6>
                      <div className="font-body" id="memberships">
                        {/* Show regular text IF link is NOT given */}
                        <a id="membership-no-link">
                          Reflexology Institute New Zealand
                        </a>
                        <br />
                        {/* Show link if the IF the website is given */}
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
