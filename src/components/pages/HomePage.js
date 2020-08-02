import React from "react";
import PageHeader from "../homepage-components/PageHeader";
import MessageOfTheDay from "../homepage-components/MessageOfTheDay";
import CallToAction from "../homepage-components/CallToAction";
import NewPractitionerList from "../practitioner-components/NewPractitionerList";
import PractitionerList from "../practitioner-components/PractitionerList";
import SearchField from "../search-components/SearchField";

class HomePage extends React.Component {
  render() {
    return (
      <div className="homePage">
        <PageHeader />
        <MessageOfTheDay />
        <NewPractitionerList />
        <SearchField />
        <PractitionerList />
        <CallToAction />
      </div>
    );
  }
}

export default HomePage;
