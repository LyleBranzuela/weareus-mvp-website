import "./CallToAction.css";
import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

class CallToAction extends React.Component {
  render() {
    return (
      <div>
        <div className="ctaStyle">
          <img
            src={require("../../assets/images/promotion_bg_cropped.jpg")}
            alt="practicioners-header"
          />
          <Container className="ctaStyle-text">
            <Row>
              <h1 id="ctaTitle">
                Practitioners, discover a refreshing new <br />
                way to meet more clients.
              </h1>
            </Row>
            <Row>
              <p id="ctaDesc">
                Get in front of people who're looking for your help. Grow your
                business through <br />
                the power of online word-of-mouth. Easily build a trusted,
                professional profile <br />
                that showcases your skills to clients actively seeking your
                help.
              </p>
            </Row>
            <Row>
              <Link to="/register">
                <Button
                  className="primaryCustomButtonStyle"
                  variant="primary"
                  id="ctaButton"
                >
                  Join Us Now
                </Button>
              </Link>
            </Row>
          </Container>
        </div>
        <Container>
          <Row>
            <Col sm={6}>
              <p id="ctaSignUp">
                Sign up for We are Us news and special offers.
              </p>
            </Col>
            <Col sm={6}>
              <InputGroup className="mb-3">
                <Form.Control
                  id="ctaSearchForm"
                  type="text"
                  placeholder="Enter your email"
                />
                <InputGroup.Append>
                  <Button variant="light" id="ctaSearchFormSubmit">
                    <img
                      alt="Submit Button"
                      src={require("../../assets/icons/subscribe_enter_arrow.svg")}
                    />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CallToAction;
