import React from "react";
import NavigationBar2 from "../general-components/NavigationBar2";
import PageHeader from "../homepage-components/PageHeader";
import FeaturesList from "../for-practitioner-components/FeaturesList";
import FeatureCarousel from "../for-practitioner-components/FeatureCarousel";
import PractitionerCTA from "../for-practitioner-components/PractitionerCTA";
import MessageOfTheDay from "../homepage-components/MessageOfTheDay";
import CallToAction from "../homepage-components/CallToAction";
import strapi from "../../api/strapi.js";

class ForPractitionersPage extends React.Component {
  constructor() {
    super();
    this.state = {
      motdContent: "",
    };
  }

  getPageContent = async () => {
    let pageContent = {};

    // Get requests to retrieve JSON information from Strapi
    const forPractMOTD = await strapi.get("/copies/17");

    pageContent.motdContent = JSON.stringify(forPractMOTD.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    this._isMounted && this.setState({ motdContent: pageContent.motdContent });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getPageContent();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <NavigationBar2 />
        <PageHeader />
        <MessageOfTheDay
          motd={<React.Fragment>{this.state.motdContent}</React.Fragment>}
        />
        <FeaturesList />
        <FeatureCarousel />
        <PractitionerCTA />
        <CallToAction />
      </div>
    );
  }
}

export default ForPractitionersPage;
