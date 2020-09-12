import React from "react";
import PageHeader from "../homepage-components/PageHeader";
import MessageOfTheDay from "../homepage-components/MessageOfTheDay";
import CallToAction from "../homepage-components/CallToAction";
import NewPractitionerList from "../practitioner-components/NewPractitionerList";
import PractitionerList from "../practitioner-components/PractitionerList";
import SearchField from "../search-components/SearchField";
import FeaturesList from "../for-practitioner-components/FeaturesList";
import FeatureCarousel from "../for-practitioner-components/FeatureCarousel";
import PractitionerCTA from "../for-practitioner-components/PractitionerCTA";
import {Button} from "react-bootstrap";

class HomePage extends React.Component {
    constructor() {
      super();
      this.state = {
        width: window.innerWidth,
      };
    }

    componentWillMount() {
      window.addEventListener('resize', this.handleWindowSizeChange);
    }


    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
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
          <PageHeader/>
          <MessageOfTheDay
            motd={
              <React.Fragment>
                We know the key to growing your  <br />
                business is to have a regular flow <br />
                of clients through your door. But <br />
                when most clients find health, <br />
                wellness & self-improvement <br />
                businesses through word-of-mouth <br />
                it can be hard to get the word <br />
                out to an abundance of clients <br />
                who are looking for help online. <br />
                We are Us provides you with a <br />
                unique platform to attract a <br />
                flow of new clients.
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
    else {
      // Desktop version
      return (
        <div>
        <PageHeader
        learnMoreButton={
          <React.Fragment>
          <Button id="headerButton">Learn More</Button>
          </React.Fragment>
        }
        />
        <MessageOfTheDay
        motd={
          <React.Fragment>
          <strong>We are Us</strong> connects you with health, wellness, and
          self-improvement <br /> practitioners throughout New Zealand.
          </React.Fragment>
        }
        />
        <NewPractitionerList />
        <SearchField />
        <PractitionerList />
        <CallToAction />
        </div>
      );
    }
  }
}

export default HomePage;
