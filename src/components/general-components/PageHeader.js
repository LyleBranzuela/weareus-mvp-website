import "./PageHeader.css";
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

class PageHeader extends React.Component {
  render() {
    return (
      <div className="pageHeader">
        <img
          src={require("../../assets/images/for_practitioners_header.jpg")}
          alt="practicioners-header"
        />
        <Container fluid className="pageHeader-text">
          <Row>
            <Col sm={5}>
              <h1 id="headerTitle">
                Discover a refreshing new <br />
                way to attract more clients.
              </h1>
            </Col>
          </Row>
          <Row>
            <Col sm={5}>
              <p id="headerDesc">
                We Are Us. An exciting new platform to grow your <br />
                health, wellness and self-improvement business.
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm={5}>
              <Button id="headerButton">Learn More</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PageHeader;
