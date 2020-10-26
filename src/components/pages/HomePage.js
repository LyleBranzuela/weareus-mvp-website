import React from "react";
import PageHeader from "../homepage-components/PageHeader";
import MessageOfTheDay from "../homepage-components/MessageOfTheDay";
import CallToAction from "../homepage-components/CallToAction";
import NewPractitionerList from "../practitioner-components/NewPractitionerList";
import PractitionerList from "../practitioner-components/PractitionerList";
import SearchField from "../search-components/SearchField";
import strapi from "../../api/strapi.js";
import NavigationBar2 from "../general-components/NavigationBar2";
import CustomButton from "../general-components/CustomButton";
import { Link } from "react-router-dom";
import api from "../../api/api";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      practitioners: [],
      newPractitioners: [],
      motdContent: "",
      motdContentMobile: "",
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Get All The Practitioners from the Server
  getAllPractitioners = async () => {
    const practitionerResponse = await api.get("/company");
    const newPracResponse = await api.get("/company/?getNewCompanies=true");

    // Setting the Services and Regions States
    this._isMounted &&
      this.setState({
        practitioners: practitionerResponse.data.rows,
        newPractitioners: newPracResponse.data,
      });
  };

  getPageContent = async () => {
    let pageContent = {};

    // Get requests to retrieve JSON information from Strapi
    const getMOTD = await strapi.get("/copies/3");

    pageContent.homeMOTD = JSON.stringify(getMOTD.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.homeMOTDMobile = JSON.stringify(getMOTD.data.copyTextMobile)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    this.setState({ motdContent: pageContent.homeMOTD,
                    motdContentMobile: pageContent.homeMOTDMobile});
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    this._isMounted = true;
    this._isMounted && this.getAllPractitioners();
    this._isMounted && this.getPageContent();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
    this._isMounted = false;
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
          <NavigationBar2 />
          <PageHeader
            learnMoreButton={
              <React.Fragment>
                <Link to="/for-practitioner">
                  <CustomButton id="headerButtonMobile" text="Learn More" />
                </Link>
              </React.Fragment>
            }
          />
          <MessageOfTheDay
            motd={
              <React.Fragment>
                <br />
                <br />
                <strong> We are Us </strong>{this.state.motdContentMobile}
                <br />
                <br />
              </React.Fragment>
            }
          />
          <NewPractitionerList
            newPractitioners={this.state.newPractitioners}
            showAll={false}
          />
          <SearchField />
          <CallToAction />
        </div>
      );
    } else {
      // Desktop version
      return (
        <div>
          <NavigationBar2 />
          <PageHeader
            learnMoreButton={
              <React.Fragment>
                <Link to="/for-practitioner">
                  <CustomButton id="headerButton" text="Learn More" />
                </Link>
              </React.Fragment>
            }
          />
          <MessageOfTheDay
            motd={
              <React.Fragment>
                <strong> We are Us </strong>{this.state.motdContent}
              </React.Fragment>
            }
          />
          <NewPractitionerList
            newPractitioners={this.state.newPractitioners}
            showAll={false}
          />
          <SearchField />
          <PractitionerList
            practitioners={this.state.practitioners}
            showAll={false}
          />
          <CallToAction />
        </div>
      );
    }
  }
}

export default HomePage;
