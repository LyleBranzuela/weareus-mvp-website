import React from "react";
import CallToAction from "../homepage-components/CallToAction";
import ImageCarousel from "../practitionerprofile-components/ImageCarousel";
import ProfileInformation from "../practitionerprofile-components/ProfileInformation";

class PractitionerProfile extends React.Component {
  render() {
    return (
      <div className="practitionerPage">
        <ImageCarousel />
        <ProfileInformation />
        <CallToAction />
      </div>
    );
  }
}

export default PractitionerProfile;
