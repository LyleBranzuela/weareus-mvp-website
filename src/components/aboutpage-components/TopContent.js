import React from "react";
import "./TopContent.css";
import { Container, Row, Col } from "react-bootstrap";
import strapi from "../../api/strapi.js";

class TopContent extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      sectionContent: "",
    };
  }

  getPageContent = async () => {
    let pageContent = {};
 
    // Get requests to retrieve JSON information from Strapi
    const getContent = await strapi.get("/copies/29");
 
 
    pageContent.sectionContent = JSON.stringify(getContent.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
 
 
    this.setState({ sectionContent: pageContent.sectionContent});
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    this._isMounted = true;
    this._isMounted && this.getPageContent();
  }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <h2 id="aboutTitle">About us</h2>
            <p id="about-paragraph">
              {this.state.sectionContent}
            </p>
            <hr style={{width: "1300px", marginTop: "100px"}}></hr>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TopContent;