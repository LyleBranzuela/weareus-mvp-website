import "./ContactInfo.css";
import React from "react";

class ContactInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;

    if (isMobile) {
      // Mobile version
      return (
      <div className="contactUsPageMobile">
        <p className="contactCTAMobile"> <strong> Contact Us </strong> </p>
        <p className="contactTextMobile"> T +64 000 0000 <br /> info@weareus.co.nz</p>
      </div>
      );
    }  else {
      return (
        <div className="contactUsPage">
          <p className="contactCTA"> <strong> Contact Us </strong> </p>
          <p className="contactText"> T +64 000 0000 <br /> info@weareus.co.nz</p>
        </div>
      );
    }
  }
}

export default ContactInfo;
