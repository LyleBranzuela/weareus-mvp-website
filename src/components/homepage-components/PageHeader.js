import "./PageHeader.css";
import React from "react";
import strapi from "../../api/strapi.js";
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

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  getPageContent = async () => {
    let pageContent = {};

    // Get requests to retrieve JSON information from Strapi
    const getHeader = await strapi.get("/copies/1");
    const getText = await strapi.get("/copies/2");
    const getImages = await strapi.get("/images/1");

    pageContent.copyHeader = JSON.stringify(getHeader.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.copyText = JSON.stringify(getText.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.copyHeaderMobile = JSON.stringify(getHeader.data.copyTextMobile)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.copyTextMobile = JSON.stringify(getText.data.copyTextMobile)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.headerImage = JSON.stringify(getImages.data.imageURL).replace(
      /"/g,
      ""
    );

    pageContent.headerImageMobile = JSON.stringify(
      getImages.data.imageURLMobile
    ).replace(/"/g, "");

    return pageContent;
  };

  componentDidMount = async () => {
    this._isMounted = true;
    window.addEventListener("resize", this.handleWindowSizeChange);

    let homepageContent = {};
    let updatedFlag = false;
    if (sessionStorage.getItem("homepage_content")) {
      homepageContent = JSON.parse(sessionStorage.getItem("homepage_content"));
    } else {
      updatedFlag = true;
      homepageContent = this._isMounted && (await this.getPageContent());
      sessionStorage.setItem(
        "homepage_content",
        JSON.stringify(homepageContent)
      );
    }

    // Assigning values retrieved from Strapi to this.state
    this._isMounted &&
      this.setState({
        copyHeader: homepageContent.copyHeader,
        copyText: homepageContent.copyText,
        copyHeaderMobile: homepageContent.copyHeaderMobile,
        copyTextMobile: homepageContent.copyTextMobile,
        imageURL: homepageContent.headerImage,
        imageURLMobile: homepageContent.headerImageMobile,
      });

    // After Check, if it's already the most recent one, then ignore
    if (!updatedFlag) {
      let contentCheck = this._isMounted && (await this.getPageContent());
      if (homepageContent !== contentCheck) {
        sessionStorage.setItem(
          "homepage_content",
          JSON.stringify(contentCheck)
        );

        // Assigning values retrieved from Strapi to this.state
        this._isMounted &&
          this.setState({
            copyHeader: homepageContent.copyHeader,
            copyText: homepageContent.copyText,
            copyHeaderMobile: homepageContent.copyHeaderMobile,
            copyTextMobile: homepageContent.copyTextMobile,
            imageURL: homepageContent.headerImage,
            imageURLMobile: homepageContent.headerImageMobile,
          });
      }
    }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
    this._isMounted = false;
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
    const headerImage = strapi.defaults.baseURL + this.state.imageURL; //Change localhost to AWS generated path when deployed.
    const headerImageMobile =
      strapi.defaults.baseURL + this.state.imageURLMobile;
    if (isMobile) {
      // Mobile version
      return (
        <div
          className="pageHeaderMobile"
          style={{
            backgroundImage: "url(" + headerImageMobile + ")",
          }}
        >
          <Container className="pageHeaderMobile-text">
            <div>
              <h1 id="headerTitleMobile">{this.state.copyHeaderMobile}</h1>
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
        <div
          className="pageHeader"
          style={{
            backgroundImage: "url(" + headerImage + ")",
          }}
        >
          <Container className="pageHeader-text">
            <Row>
              <h1 id="headerTitle">{this.state.copyHeader}</h1>
            </Row>
            <Row>
              <p id="headerDesc">{this.state.copyText}</p>
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
