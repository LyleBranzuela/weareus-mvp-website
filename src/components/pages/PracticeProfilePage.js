import React from "react";
import PracticeCallToAction from "../homepage-components/CallToAction";
import PracticeImageCarousel from "../practiceprofile-component/PracticeImageCarousel";
import PracticeProfileInfo from "../practiceprofile-component/PracticeProfileInfo";

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
