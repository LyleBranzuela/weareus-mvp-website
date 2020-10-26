import "./TermsAndConditions.css";
import React from "react";
import strapi from "../../api/strapi.js";

{/* When more Terms and Conditions is added, follow 
the same template in other classes & refer to Strapi Guide to add more sections*/}
class TermsAndConditions extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      tncHeader: "",
      tncSectionHeader: "",
      tncContent: "",
    };
  }

  getPageContent = async () => {
    let pageContent = {};

    // Get requests to retrieve JSON information from Strapi
    const getTncHeader = await strapi.get("/copies/26");
    const getTncSectionHeader = await strapi.get("/copies/27");
    const getTncContent = await strapi.get("/copies/28");


    pageContent.tncHeader = JSON.stringify(getTncHeader.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.tncSectionHeader = JSON.stringify(getTncSectionHeader.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.tncContent = JSON.stringify(getTncContent.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");



    this.setState({
      tncHeader: pageContent.tncHeader,
      tncSectionHeader: pageContent.tncSectionHeader,
      tncContent: pageContent.tncContent
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
        <div className="tacPageMobile">
          <p className="tacHeaderMobile">
            {" "}
            <strong> {this.state.tncHeader} </strong>{" "}
          </p>
          <p className="tacTextMobile">
            <strong> {this.state.tncSectionHeader} </strong> <br /> 
            {this.state.tncContent}
          </p>
        </div>
      );
    } else {
      return (
        <div className="tacPage">
          <p className="tacHeader">
            {" "}
            <strong> {this.state.tncHeader} </strong>{" "}
          </p>
          <p className="tacText">
            <strong> {this.state.tncSectionHeader} </strong> <br /> 
            {this.state.tncContent}
          </p>
        </div>
      );
    }
  }
}

export default TermsAndConditions;
