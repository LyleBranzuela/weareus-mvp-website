import React from "react";
import NavigationBar2 from "../general-components/NavigationBar2";
import PageHeader from "../homepage-components/PageHeader";
import FeaturesList from "../for-practitioner-components/FeaturesList";
import FeatureCarousel from "../for-practitioner-components/FeatureCarousel";
import PractitionerCTA from "../for-practitioner-components/PractitionerCTA";
import MessageOfTheDay from "../homepage-components/MessageOfTheDay";
import CallToAction from "../homepage-components/CallToAction";

class ForPractitionersPage extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar2 />
        <PageHeader />
        <MessageOfTheDay
          motd={
            <React.Fragment>
              We know the key to growing your business is to have a regular flow
              of clients <br /> through your door. But when most clients find
              health, wellness & self-
              <br />
              improvement businesses through word-of-mouth it can be hard to get
              the word <br /> out ot an abundance of clients who are looking for
              help online. We are Us
              <br /> provides you with a unique platform to attract a flow of
              new clients.
            </React.Fragment>
          }
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
