import "./TherapyList.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

class TherapyList extends React.Component {
  render() {
    let placeholderList = [
      "Abdominal Massage",
      "Acupressure",
      "Allergy Intolerance",
      "Ayurvedic Massage Therapy",
      "Ayurvedic Medicine",
      "Biodynamic",
      "Biofeedback",
      "Biomagnetic",
      "Bioptron Light Therapy",
    ];
    const searchKeywords = placeholderList.map((searchKeyword) => (
      <li key={searchKeyword}>{searchKeyword}</li>
    ));

    return (
      <Container className="therapyListStyle">
        <Row>
          <h4>Find a practitioner by therapy type</h4>
        </Row>
        <Row>
          <Col sm={3}>
            <ul>{searchKeywords}</ul>
          </Col>
          <Col sm={3}>
            <ul>{searchKeywords}</ul>
          </Col>
          <Col sm={3}>
            <ul>{searchKeywords}</ul>
          </Col>
          <Col sm={3}>
            <ul>{searchKeywords}</ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TherapyList;
