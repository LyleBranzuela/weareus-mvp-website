import React from "react";
import "./ClientSection.css";
import { Container, Row, Col } from "react-bootstrap";
import strapi from "../../api/strapi.js";

class ClientSection extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      introHeader: "",
      introText: "",
      desc1: "",
      message: "",
      desc2: "",
      imageURL: "",
    };
  }

  getPageContent = async () => {
    let pageContent = {};

    // Get requests to retrieve JSON information from Strapi
    const getIntroHeader = await strapi.get("/copies/30");
    const getIntroText = await strapi.get("/copies/31");
    const getDesc1 = await strapi.get("/copies/32");
    const getMessage = await strapi.get("/copies/33");
    const getDesc2 = await strapi.get("/copies/34");
    const getClientImage = await strapi.get("/images/8");

    pageContent.introHeader = JSON.stringify(getIntroHeader.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.introText = JSON.stringify(getIntroText.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.desc1 = JSON.stringify(getDesc1.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.clientMessage = JSON.stringify(getMessage.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.getDesc2 = JSON.stringify(getDesc2.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.imageURL = JSON.stringify(getClientImage.data.imageURL).replace(
      /"/g,
      ""
    );

    this._isMounted &&
      this.setState({
        introHeader: pageContent.introHeader,
        introText: pageContent.introText,
        desc1: pageContent.desc1,
        message: pageContent.clientMessage,
        desc2: pageContent.getDesc2,
        imageURL: pageContent.imageURL,
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getPageContent();
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const clientImage = strapi.defaults.baseURL + this.state.imageURL;
    return (
      <Container fluid>
        <Row>
          <Col>
            <img src={clientImage} alt="charis" id="mainFrame" />
            <h5 id="heavyHeader">{this.state.introHeader}</h5>
            <p id="lightHeader">{this.state.introText}</p>
            <div className="aboutContentP" id="big-description">
              {this.state.desc1}
              <strong>
                <blockquote></blockquote>
              </strong>
              <p id="clientMessage">{this.state.message}</p>
              <br />
              {this.state.desc2}
              <br />
              <br />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ClientSection;
