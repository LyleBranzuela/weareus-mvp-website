import React from "react";
import PageHeader from "../homepage-components/PageHeader";
import MessageOfTheDay from "../homepage-components/MessageOfTheDay";
import CallToAction from "../homepage-components/CallToAction";
import NewPractitionerList from "../practitioner-components/NewPractitionerList";
import PractitionerList from "../practitioner-components/PractitionerList";
import SearchField from "../search-components/SearchField";
import {Button} from "react-bootstrap";

class HomePage extends React.Component {
  render() {
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

export default HomePage;
