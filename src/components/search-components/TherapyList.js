import "./TherapyList.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

class TherapyList extends React.Component {
  render() {
    let placeholderList = [
      "Acupressure",
      "Acupuncture",
      "Access Bars",
      "Alternative therapies",
      "Alexander technique",
      "Aqua healing / Aquarian Healing",
      "Aromatherapy",
      "Art Therapy",
      "Astrology",
      "Aura-soma",
      "Aura readers",
      "Ayurveda",
      "Bach flower therapy",
      "Biofeedback Analysis",
      "Biochemistry",
      "Bodywork",
      "Body Talk System",
      "Bowan Therapy",
      "Brennan Healing Science Breathwork",
      "Brain Gym",
      "Clean Eating",
      "Bio-Energetic Therapy",
      "Chakra Rebalancing",
      "Channelling",
      "Chiropractor",
      "Clairvoyance",
      "Crystal Healing",
      "Colon Hydrotherapy",
      "Colour Healing",
    ];

    /** Calculate how many items each of the 4 columns should have */
    let printColItemAmount = Math.ceil(placeholderList.length / 4);
    // Map a list element with each item in the placeholder list
    const searchKeywords = placeholderList.map((searchKeyword) => {
      return <li key={searchKeyword}>{searchKeyword}</li>;
    });

    return (
      <Container className="therapyListStyle">
        <Row>
          <h4>Find a practitioner by therapy type</h4>
        </Row>
        <Row>
          {/* Loop Through Each Column's Modality, Slice is used so that portions that doesn't exist does not return an error */}
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
