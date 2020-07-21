import React from "react";
import PageHeader from "../homepage-components/PageHeader";
import MessageOfTheDay from "../homepage-components/MessageOfTheDay";

class HomePage extends React.Component {
  render() {
    return (
      <div className="homePage">
        <PageHeader />
        <MessageOfTheDay />
      </div>
    );
  }
}

export default HomePage;
