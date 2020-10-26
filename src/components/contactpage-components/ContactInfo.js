import "./ContactInfo.css";
import React from "react";
import strapi from "../../api/strapi.js";

class ContactInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      contactHeader: "",
      contactContent: "",
    };
  }

  getPageContent = async () => {
    let pageContent = {};

    // Get requests to retrieve JSON information from Strapi
    const getContactHeader = await strapi.get("/copies/24");
    const getContactDetails = await strapi.get("/copies/25");

    pageContent.contactHeader = JSON.stringify(getContactHeader.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.contactContent = JSON.stringify(getContactDetails.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    this.setState({
      contactHeader: pageContent.contactHeader,
      contactContent: pageContent.contactContent,
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

    if (isMobile) {
      // Mobile version
      return (
        <div className="contactUsPageMobile">
          <p className="contactCTAMobile">
            {" "}
            <strong> {this.state.contactHeader} </strong>{" "}
          </p>
          <p className="contactTextMobile"> {this.state.contactContent} </p>
        </div>
      );
    } else {
      return (
        <div className="contactUsPage">
          <p className="contactCTA">
            {" "}
            <strong> {this.state.contactHeader}</strong>{" "}
          </p>
          <p className="contactText"> {this.state.contactContent}</p>
        </div>
      );
    }
  }
}

export default ContactInfo;
