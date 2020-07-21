import React from "react";
import PageHeader from "../homepage-components/PageHeader";
import MessageOfTheDay from "../homepage-components/MessageOfTheDay";
import CallToAction from "../homepage-components/CallToAction";

class HomePage extends React.Component {
  render() {
    return (
      <div className="homePage">
        <PageHeader />
        <MessageOfTheDay />
        <CallToAction />
      </div>
    );
  }
}

export default HomePage;
