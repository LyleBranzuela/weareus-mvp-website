import "./CallToAction.css";
import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

class CallToAction extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;

    if (isMobile) {
      // Mobile version
      return (
        <div>
          <div className="ctaStyleMobile">
            <Container className="ctaStyleMobile-text">
              <div id="ctaMobileTextRow">
                <h1 id="ctaTitleMobile">
                  Pre-launch offer. <br />
                  Register now and get <br />
                  your 2nd Year Free!
                </h1>
              </div>
              <div id="ctaMobileTextRow">
                <p id="ctaDescMobile">
                  Register with We are Us before 31 Dec <br />
                  2020 and we'll give you your second <br />
                  year free to say a big, massive thank <br />
                  you for supporting us right at the <br />
                  beginning of our journey.
                </p>
              </div>
              <div>
                <Button id="ctaButtonMobile">Register today!</Button>
              </div>
            </Container>
          </div>
          <Container id="SignUpContainerMobile">
            <Row>
              <Col sm={6}>
                <p id="ctaSignUpMobile">
                  Sign up for We are Us <br />
                  news and special offers.
                </p>
              </Col>
              <Col sm={6}>
                <InputGroup className="mb-3">
                  <Form.Control
                    id="ctaSearchFormMobile"
                    type="text"
                    placeholder="Enter your email"
                  />
                  <InputGroup.Append>
                    <Button variant="light" id="ctaSearchFormSubmitMobile">
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
    } else {
      // Desktop Version
      return (
        <div>
          <div className="ctaStyle">
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
          {/** Call To Action Email Signup Section */}
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
                    id="ctaSignUpForm"
                    type="text"
                    placeholder="Enter your email"
                  />
                  <InputGroup.Append>
                    <Button variant="light" id="ctaSignUpFormSubmit">
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
}

export default CallToAction;
