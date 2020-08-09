import "./ContactInfo.css";
import React from "react";

class ContactInfo extends React.Component {
  render() {
    return (
      <div className="contactUsPage">
        <p className="contactCTA"> <strong> Contact Us </strong> </p>
        <p className="contactText"> T +64 000 0000 <br /> info@weareus.co.nz</p>
      </div>
    );
  }
}

export default ContactInfo;
