import "./PageHeader.css";
import React from "react";
import axios from 'axios';
import { Container, Row } from "react-bootstrap";

class PageHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      copyHeader: "",
      copyText: "",
      copyHeaderMobile: "",
      copyTextMobile: "",
      imageURL: "",
      imageURLMobile: "",
    };
  }

  componentDidMount = async () => {
    window.addEventListener("resize", this.handleWindowSizeChange);

    // Get requests to retrieve JSON information from Strapi
    const getHeader = await axios({
      method: 'GET',
      url: 'http://localhost:1337/copies/1'
    });

    const getText = await axios({
      method: 'GET',
      url: 'http://localhost:1337/copies/2'
    });

    const getImages = await axios({
      method: 'GET',
      url: 'http://localhost:1337/images/1'
    })

    const copyHeader = JSON.stringify(getHeader.data.copyText).replace(/\\n/g, '\n').replace(/\"/g, "");
    const copyText = JSON.stringify(getText.data.copyText).replace(/\\n/g, '\n').replace(/\"/g, "");
    const copyHeaderMobile = JSON.stringify(getHeader.data.copyTextMobile).replace(/\\n/g, '\n').replace(/\"/g, "");
    const copyTextMobile = JSON.stringify(getText.data.copyTextMobile).replace(/\\n/g, '\n').replace(/\"/g, "");
    const headerImage = JSON.stringify(getImages.data.imageURL).replace(/\"/g, "");
    const headerImageMobile = JSON.stringify(getImages.data.imageURLMobile).replace(/\"/g, "");
    this.setState({
      copyHeader: copyHeader,
      copyText: copyText,
      copyHeaderMobile: copyHeaderMobile,
      copyTextMobile: copyTextMobile,
      imageURL: headerImage,
      imageURLMobile: headerImageMobile
    })

  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  scrollDown = () => {
    document.body.scrollBy({
      top: window.innerHeight - window.innerHeight * 0.1,
      left: 0,
      behavior: "smooth",
    });
  };

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;
    const headerImage = 'http://localhost:1337' + this.state.imageURL;  //Change localhost to AWS generated path when deployed.
    const headerImageMobile = 'http://localhost:1337' + this.state.imageURLMobile;
    if (isMobile) {
      // Mobile version
      return (
        <div className="pageHeaderMobile" style={{
          backgroundImage: "url(" + headerImageMobile + ")"
        }}>
          <Container className="pageHeaderMobile-text">
            <div>
              <h1 id="headerTitleMobile">
                {this.state.copyHeaderMobile}
              </h1>
            </div>
            <div>
              <p id="headerDescMobile">
                {this.state.copyTextMobile} <br />
                {this.props.learnMoreButton}
              </p>
              <img
                src={require("../../assets/icons/menu_arrow_white.svg")}
                alt="practitioners-header"
                id="scrollDownButtonMobile"
                onClick={this.scrollDown}
              />
            </div>
          </Container>
        </div>
      );
    } else {
      return (
        /** Adjustable Page Header for Practitioner and Homepage */
        <div className="pageHeader" style={{
          backgroundImage: "url(" + headerImage + ")"
        }}>
          <Container className="pageHeader-text">
            <Row>
              <h1 id="headerTitle">
                {this.state.copyHeader}
              </h1>
            </Row>
            <Row>
              <p id="headerDesc">
                {this.state.copyText}
              </p>
            </Row>
            <Row>{this.props.learnMoreButton}</Row>
          </Container>
          <img
            src={require("../../assets/icons/menu_arrow_white.svg")}
            alt="practitioners-header"
            id="scrollDownButton"
            onClick={this.scrollDown}
          />
        </div>
      );
    }
  }
}

export default PageHeader;
