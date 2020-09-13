import "./TherapyList.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

class TherapyList extends React.Component {
  render() {
    let placeholderList = [
      "Abdominal Massage",
      "Acupressure",
      "Access Bars",
      "Alternative therapies",
      "Alexander technique",
      "Aqua healing / Aquarian Healing",
      "Aromatherapy",
      "Art Therapy",
      "Abdominal Massage",
      "Acupressure",
      "Access Bars",
      "Alternative therapies",
      "Alexander technique",
      "Aqua healing / Aquarian Healing",
      "Aromatherapy",
      "Art Therapy",
      "Abdominal Massage",
      "Acupressure",
      "Access Bars",
      "Alternative therapies",
      "Alexander technique",
      "Aqua healing / Aquarian Healing",
      "Aromatherapy",
      "Art Therapy",
      "Abdominal Massage",
      "Acupressure",
      "Access Bars",
      "Alternative therapies",
      "Alexander technique",
      "Aqua healing / Aquarian Healing",
      "Aromatherapy",
      "Art Therapy",
      "Abdominal Massage",
      "Acupressure",
      "Access Bars",
      "Alternative therapies",
      "Alexander technique",
      "Aqua healing / Aquarian Healing",
      "Aromatherapy",
      "Art Therapy",
    ];

    let printColItemAmount = Math.ceil(placeholderList.length / 4);
    const searchKeywords = placeholderList.map((searchKeyword) => {
      return <li key={searchKeyword}>{searchKeyword}</li>;
    });

    return (
      <Container className="therapyListStyle">
        <Row>
          <h4>Find a practitioner by therapy type</h4>
        </Row>
        <Row>
          {/* Loop Through Each Column's Modality */}
          <Col sm={3}>
            <ul>{searchKeywords.slice(0, printColItemAmount)}</ul>
          </Col>
          <Col sm={3}>
            <ul>
              {searchKeywords.slice(printColItemAmount, printColItemAmount * 2)}
            </ul>
          </Col>
          <Col sm={3}>
            <ul>
              {searchKeywords.slice(
                printColItemAmount * 2,
                printColItemAmount * 3
              )}
            </ul>
          </Col>
          <Col sm={3}>
            <ul>
              {searchKeywords.slice(
                printColItemAmount * 3,
                placeholderList.length
              )}
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TherapyList;
