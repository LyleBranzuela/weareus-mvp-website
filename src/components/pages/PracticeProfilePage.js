import React from "react";
import PracticeCallToAction from "../homepage-components/CallToAction";
import PracticeImageCarousel from "../practiceprofile-components/PracticeImageCarousel";
import PracticeProfileInfo from "../practiceprofile-components/PracticeProfileInfo";

class PractitionerProfile extends React.Component {
  render() {
    return (
      <div className="practitionerPage">
        <PracticeImageCarousel />
        <PracticeProfileInfo />
        <PracticeCallToAction />
      </div>
    );
  }
}

export default PractitionerProfile;
