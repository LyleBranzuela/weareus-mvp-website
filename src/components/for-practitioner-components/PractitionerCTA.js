import "./PractitionerCTA.css";
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import strapi from "../../api/strapi.js";

class PractitionerCTA extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      ctaHeader1: "",
      ctaHeader2: "",
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }


  getPageContent = async () => {
    let pageContent = {};

    // Get requests to retrieve JSON information from Strapi
    const getCTAHeader1 = await strapi.get("/copies/22");
    const getCTAHeader2 = await strapi.get("/copies/23");


    pageContent.getCTAHeader1 = JSON.stringify(getCTAHeader1.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.getCTAHeader2 = JSON.stringify(getCTAHeader2.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    /* Uncomment and edit copyTextMobile on Strapi if page has different mobile CTA  */
    // pageContent.getCTAHeader1Mobile = JSON.stringify(getCTAHeader.data.copyTextMobile)
    //   .replace(/\\n/g, "\n")
    //   .replace(/"/g, "");

    // pageContent.getCTAHeader2Mobile = JSON.stringify(getCTAHeader.data.copyTextMobile)
    //   .replace(/\\n/g, "\n")
    //   .replace(/"/g, "");

    this.setState({ ctaHeader1: pageContent.getCTAHeader1,
                    ctaHeader2: pageContent.getCTAHeader2});
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

    if (isMobile) {
      // Mobile version
      return (
        <div>
          <Container fluid className="practitionerCTAStyle">
            <Container>
              <Row>
                <Col sm={6} id="prac-CTA-1-mobile">
                  <h5>
                    {this.state.ctaHeader1}
                  </h5>
                  <Link to="/register-practitioner">
                    <Button variant="outline-dark">Register</Button>
                  </Link>
                </Col>
                <Col sm={6} id="prac-CTA-2">
                  <h5>
                    {this.state.ctaHeader2}
                  </h5>
                  <Link to="/about">
                    <Button variant="outline-dark">About Us</Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </Container>
        </div>
      );
    } else {
      return (
        <div>
          <Container fluid className="practitionerCTAStyle">
            <Container>
              <Row>
                <Col sm={6} id="prac-CTA-1">
                  <h5>
                    {this.state.ctaHeader1}
                  </h5>
                  <Link to="/register-practitioner">
                    <Button variant="outline-dark">Register</Button>
                  </Link>
                </Col>
                <Col sm={6} id="prac-CTA-2">
                  <h5>
                    {this.state.ctaHeader2}
                  </h5>
                  <Link to="/about">
                    <Button variant="outline-dark">About Us</Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </Container>
        </div>
      );
    }

  };
}

export default PractitionerCTA;
