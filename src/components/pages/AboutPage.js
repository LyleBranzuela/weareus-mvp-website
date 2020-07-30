import React from "react";

import TopContent from "../aboutpage-components/TopContent";
import ClientSection from "../aboutpage-components/ClientSection";
import TeamSection from "../aboutpage-components/TeamSection";

import CallToAction from "../homepage-components/CallToAction";


class AboutPage extends React.Component {
  render() {
    return (
      <div className="aboutPage">

        <TopContent />
        <ClientSection />
        <TeamSection />

        <CallToAction />

      </div>
    );
  }
}

export default AboutPage;
