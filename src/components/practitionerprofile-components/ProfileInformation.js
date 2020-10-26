import React from "react";
import "./ProfileInformation.css";
import icon_diploma from "../../assets/icons/icon_diploma.svg";
import icon_certificate from "../../assets/icons/icon_certificate.svg";
import icon_memberships from "../../assets/icons/icon_memberships.svg";
import icon_accordion_arrow from "../../assets/icons/accordion_arrow.svg";
import { Container, Row, Col, Accordion, Card } from "react-bootstrap";
import ContactCard from "./ContactCard";
import ExpendableText from "./ExpendableText";
import api from "../../api/api";

class ProfileInformation extends React.Component {
  constructor() {
    super();
    this.state = {
      onlySpecialist: "",
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Gets the Specialist Details from the Server
  getSpecialistDetails = async () => {
    if (this.props.specialists.length > 0) {
      const specialistResponse = await api.get(
        `/specialist-profile/${this.props.specialists[0]}`
      );
      // Setting the Specialists's Detail State
      this._isMounted &&
        this.setState({
          onlySpecialist: specialistResponse.data,
        });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getSpecialistDetails();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Update Search whenever the URL is changed
  componentDidUpdate(prevProps) {
    if (this.props.specialists !== prevProps.specialists) {
      this.getSpecialistDetails();
    }
  }

  render() {
    return (
      <Container fluid className="container-dimensions">
        <Row>
          <Col lg={8} className="no-padding">
            {/* Practitioner Profile Image */}
            {this.state.onlySpecialist.profile_image_url ? (
              <img
                style={{ height: 224, width: 224 }}
                alt="practitioner-profile"
                src={this.state.onlySpecialist.profile_image_url}
                id="profile-image-frame"
              />
            ) : (
              <img
                style={{ height: 224, width: 224 }}
                alt="practitioner-profile"
                src={require("../../assets/images/placeholders/prac_profile_placeholder.jpg")}
                id="profile-image-frame"
              />
            )}

            {/* Practitioner Name */}
            <h2 className="practitioner-title" id="practitioner-name">
              {this.props.company_name}
              {/* Practitioner Business Logo Image */}
              {this.props.logo ? (
                <img
                  style={{ width: 175, height: 175 }}
                  src={this.props.logo}
                  alt="logo"
                  className="practitioner-logo"
                />
              ) : (
                <img
                  style={{ width: 175, height: 175 }}
                  src={require("../../assets/images/placeholders/prac_logo_placeholder.jpg")}
                  alt="logo"
                  className="practitioner-logo"
                />
              )}
            </h2>
            {/* Practitioner Specialty Category/ies */}
            <div id="category">
              <span id="category-text">
                {this.state.onlySpecialist.specialty &&
                  this.state.onlySpecialist.specialty.map(
                    (specialty, index) => {
                      return (
                        <span key={specialty.specialty_id}>
                          {index <
                          this.state.onlySpecialist.specialty.length - 1
                            ? specialty.specialty_name + ", "
                            : specialty.specialty_name}
                        </span>
                      );
                    }
                  )}
              </span>
            </div>

            {/* Location including Suburb and City*/}
            <div id="location">
              <span id="suburb-profile">{this.props.suburb},</span>
              <span id="city-profile"> {this.props.city}</span>
            </div>
            <br />
            {this.props.accreditations &&
              this.props.accreditations.map((accreditation, index) => {
                return (
                  <p
                    className="box"
                    key={`${index}-${accreditation.accreditation_id}`}
                  >
                    {accreditation.accreditation_name}
                  </p>
                );
              })}
            <h5 className="practitioner-name" id="person-name">
              {this.state.onlySpecialist.first_name}{" "}
              {this.state.onlySpecialist.last_name}
            </h5>
          </Col>
          {/* Contact card column */}
          <Col lg={4} className="contact-card-column">
            <ContactCard
              user_id={this.state.onlySpecialist.user_id}
              company_id={this.props.company_id}
              first_name={this.state.onlySpecialist.specialist_first_name}
              last_name={this.state.onlySpecialist.specialist_last_name}
              company_name={this.props.company_name}
              company_address1={this.props.company_address1}
              company_address2={this.props.company_address2}
              phone={this.props.phone}
              email={this.props.email}
            ></ContactCard>
          </Col>
        </Row>
        <Row>
          <Col lg={8} className="no-padding">
            {/* Practitioner "About" Section*/}

            {/* Read More button for practitioner description */}
            <Card className="practitioner-description-card">
              <Card.Body>
                <Card.Title>About</Card.Title>
                {/* Max Height by default is 145 */}
                {/* maxHeight will determine how much text is shown in the description */}
                {/* IF a description is longer than the height of the Card THEN a "Read More" button will appear */}
                <ExpendableText maxHeight={145}>
                  {this.props.about}
                </ExpendableText>
              </Card.Body>
            </Card>
            {/* END OF practitioner "About" Section */}

            {/* START OF Accordion Section */}
            <Container fluid className="accordion-section">
              <Accordion defaultationkey="0">
                {/* Specialties Accordion */}
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    Specialties
                    <img
                      alt="accordion_arrow"
                      src={icon_accordion_arrow}
                      className="arrow-position"
                    ></img>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    {/* Section containing Specialty categories */}
                    <Card.Body>
                      <ul className="accordion-content-list-style">
                        {this.state.onlySpecialist.specialty &&
                          this.state.onlySpecialist.specialty.map(
                            (specialty, index) => {
                              return (
                                <li key={`${index}-${specialty.specialty_id}`}>
                                  <h5>{specialty.specialty_name}</h5>
                                </li>
                              );
                            }
                          )}
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
                      alt="accordion_arrow"
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
                        {this.props.services &&
                          this.props.services.map((service, index) => {
                            return (
                              <li key={`${index}-${service}`}>
                                <h5>{service.service_name}</h5>
                              </li>
                            );
                          })}
                      </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                {/* Training, Qualifications & Memberships Accordion */}
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="2">
                    Training, Qualifications & Memberships
                    <img
                      alt="accordion_arrow"
                      src={icon_accordion_arrow}
                      className="arrow-position"
                    ></img>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="2">
                    {/* Education (Diploma) sub-section */}
                    <Card.Body>
                      <h6 className="title-header">
                        <img
                          alt="accordion_diploma"
                          src={icon_diploma}
                          style={{ paddingRight: "5px" }}
                        ></img>
                        Diplomas
                      </h6>
                      <div className="font-body" id="education">
                        {/* List of Diplomas */}
                        <ul className="training-accordion-body-font">
                          {this.state.onlySpecialist.diplomas &&
                            this.state.onlySpecialist.diplomas.map(
                              (training) => {
                                return (
                                  <li key={training.diploma_id}>
                                    {training.diploma_name}{" "}
                                    {training.time_taken &&
                                      `(${training.time_taken})`}
                                  </li>
                                );
                              }
                            )}
                        </ul>
                      </div>
                      <br />
                      {/* END OF Education (Diploma) section */}
                      {/* Certifications sub-section */}
                      <h6 className="title-header">
                        <img
                          alt="accordion_certificate"
                          src={icon_certificate}
                          style={{ paddingRight: "5px" }}
                        ></img>
                        Certificates
                      </h6>
                      {/* List of certifications achieved */}
                      <ul className="training-accordion-body-font">
                        {this.state.onlySpecialist.certification &&
                          this.state.onlySpecialist.certification.map(
                            (training) => {
                              return (
                                <li key={training.certification_id}>
                                  {training.certification_name}{" "}
                                  {training.time_taken &&
                                    `(${training.time_taken})`}
                                </li>
                              );
                            }
                          )}
                      </ul>
                      <br />
                      {/* Memberships sub-section*/}
                      <h6 className="title-header">
                        <img
                          alt="accordion_memberships"
                          src={icon_memberships}
                          style={{ paddingRight: "5px" }}
                        ></img>
                        Memberships
                      </h6>
                      <div className="font-body" id="memberships">
                        {this.state.onlySpecialist.membership &&
                          this.state.onlySpecialist.membership.map(
                            (training) => {
                              return (
                                <div key={training.membership_id}>
                                  {/* Show REGULAR TEXT - IF link is NOT given */}
                                  {!training.website ? (
                                    <span href="/#" id="membership-no-link">
                                      {training.membership_name}
                                    </span>
                                  ) : (
                                    /* SHOW LINK - IF the website is given */
                                    <a
                                      href={`${training.website}`}
                                      style={{ color: "#79158f" }}
                                      className="membership-link"
                                    >
                                      <u>{training.membership_name}</u>
                                    </a>
                                  )}
                                  <br />
                                </div>
                              );
                            }
                          )}
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
