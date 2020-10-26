import "./CallToAction.css";
import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import strapi from "../../api/strapi.js";

class CallToAction extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      ctaHeader: "",
      ctaContent: "",
      ctaHeaderMobile: "",
      ctaContentMobile: "",
      ctaImage: "",
      ctaImageMobile: "",
    };
  }

  getPageContent = async () => {
    let pageContent = {};

    // Get requests to retrieve JSON information from Strapi
    const getCTAHeader = await strapi.get("/copies/4");
    const getCTAContent = await strapi.get("/copies/5");
    const getCTAImage = await strapi.get("/images/2")

    pageContent.homeCTAHeader = JSON.stringify(getCTAHeader.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.homeCTAContent = JSON.stringify(getCTAContent.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.homeCTAHeaderMobile = JSON.stringify(getCTAHeader.data.copyTextMobile)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.homeCTAContentMobile = JSON.stringify(getCTAContent.data.copyTextMobile)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.ctaImage = JSON.stringify(getCTAImage.data.imageURL).replace(/"/g, "");
    pageContent.ctaImageMobile = JSON.stringify(getCTAImage.data.imageURLMobile).replace(/"/g, "");

    this.setState({
      ctaHeader: pageContent.homeCTAHeader,
      ctaContent: pageContent.homeCTAContent,
      ctaHeaderMobile: pageContent.homeCTAHeaderMobile,
      ctaContentMobile: pageContent.homeCTAContentMobile,
      ctaImage: pageContent.ctaImage,
      ctaImageMobile: pageContent.ctaImage,
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    this._isMounted = true;
    this._isMounted && this.getPageContent();
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

    const ctaImage = strapi.defaults.baseURL + this.state.ctaImage;
    const ctaImageMobile = strapi.defaults.baseURL + this.state.ctaImageMobile;

    if (isMobile) {
      // Mobile version
      return (
        <div>
          <div className="ctaStyleMobile" style={{
            backgroundImage: "url(" + ctaImageMobile + ")",
          }}>
            <Container className="ctaStyleMobile-text">
              <div id="ctaMobileTextRow">
                <h1 id="ctaTitleMobile">
                  {this.state.ctaHeaderMobile}
                </h1>
              </div>
              <div id="ctaMobileTextRow">
                <p id="ctaDescMobile">
                  {this.state.ctaContentMobile}
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
          <div className="ctaStyle" style={{
            backgroundImage: "url(" + ctaImage + ")",
          }}>
            <Container className="ctaStyle-text">
              <Row>
                <h1 id="ctaTitle">
                  {this.state.ctaHeader}
                </h1>
              </Row>
              <Row>
                <p id="ctaDesc">
                  {this.state.ctaContent}
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
          <div id="signUpContainer">
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
        </div>
      );
    }
  }
}

export default CallToAction;
