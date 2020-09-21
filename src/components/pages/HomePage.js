import React from "react";
import PageHeader from "../homepage-components/PageHeader";
import MessageOfTheDay from "../homepage-components/MessageOfTheDay";
import CallToAction from "../homepage-components/CallToAction";
import NewPractitionerList from "../practitioner-components/NewPractitionerList";
import PractitionerList from "../practitioner-components/PractitionerList";
import SearchField from "../search-components/SearchField";
import PractitionerCTA from "../for-practitioner-components/PractitionerCTA";
import { Button } from "react-bootstrap";

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
          <PageHeader
            learnMoreButton={
              <Button id="headerButtonMobile">Learn More</Button>
            }
          />
          <MessageOfTheDay
            motd={
              <React.Fragment>
                <br />
                <br />
                <strong>We are Us</strong> connects you with <br />
                health, wellness, and self-<br />
                improvement practitioners <br />
                throughout New Zealand. 
                <br />
                <br />
              </React.Fragment>
            }
          />
          <NewPractitionerList />
          <SearchField />
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
              <Button id="headerButton">Learn More</Button>
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
