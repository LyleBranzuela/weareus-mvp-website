import React from "react";
import "./TopContent.css";
import { Container, Row, Col } from "react-bootstrap";

class TopContent extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <h2 id="aboutTitle">About us</h2>
            <p id="about-paragraph">
              We're all on a journey. Having the right people with us on our
              journey can ground <br />
              us, grow us and help us be of service to others on their journey.
              <br />
              <br />
              But choosing the right people to help us can be difficult. That's
              why so many of us <br />
              ask our friends and family for recommendations, or go online and
              read reviews.
            </p>
            <hr style={{width: "1300px", marginTop: "100px"}}></hr>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TopContent;