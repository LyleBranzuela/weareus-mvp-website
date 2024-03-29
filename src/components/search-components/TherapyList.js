import "./TherapyList.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { servicesList } from "../App";

class TherapyList extends React.Component {
  render() {
    /** Calculate how many items each of the 4 columns should have */
    let therapyList = servicesList.placeholderList;
    let printColItemAmount = Math.ceil(therapyList.length / 4);
    // Map a list element with each item in the placeholder list
    const searchKeywords = therapyList.map((searchKeyword) => {
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
              {searchKeywords.slice(printColItemAmount * 3, therapyList.length)}
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TherapyList;
