import React from "react";
import TopContent from "../aboutpage-components/TopContent";
import ClientSection from "../aboutpage-components/ClientSection";
import TeamSection from "../aboutpage-components/TeamSection";

class AboutPage extends React.Component {
  render() {
    return (
      <div className="aboutPage">
        <TopContent />
        <ClientSection />
        <TeamSection />
      </div>
    );
  }
}

export default AboutPage;
