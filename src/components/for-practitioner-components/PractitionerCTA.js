import "./PractitionerCTA.css";
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PractitionerCTA = () => {
  return (
    <Container fluid className="practitionerCTAStyle">
      {/** Mini CTAs for Practitioners */}
      <Container>
        <Row>
          <Col sm={6} id="prac-CTA-1">
            <h5>
              Launching early 2019.
              <br />
              Join We are Us and become one of Us.
            </h5>
            <Link to="/register-practitioner">
              <Button variant="outline-dark">Register</Button>
            </Link>
          </Col>
          <Col sm={6} id="prac-CTA-2">
            <h5>
              Find out more about We are Us
              <br />
              and our story.
            </h5>
            <Link to="/about">
              <Button variant="outline-dark">About Us</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default PractitionerCTA;
