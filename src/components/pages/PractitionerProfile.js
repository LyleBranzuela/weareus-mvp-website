import React from "react";
import CallToAction from "../homepage-components/CallToAction";
import ImageCarousel from "../practitionerprofile-components/ImageCarousel";
import ProfileInformation from "../practitionerprofile-components/ProfileInformation";
// import ContactCard from "../practitionerprofile-components/ContactCard";
import { pageTransition } from "../App";
import { motion } from "framer-motion";

class PractitionerProfile extends React.Component {
  render() {
    return (
      <motion.div
        intial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
        className="practitionerPage"
      >
        <ImageCarousel />
        {/* <ContactCard /> */}
        <ProfileInformation />
        <CallToAction />
      </motion.div>
    );
  }
}

export default PractitionerProfile;
