import React from "react";
import CallToAction from "../homepage-components/CallToAction";
import ImageCarousel from "../practitionerprofile-components/ImageCarousel";
import ProfileInformation from "../practitionerprofile-components/ProfileInformation";
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> parent of e9faf8f... ..
import ContactCard from "../practitionerprofile-components/ContactCard";
import { pageTransition } from "../../transitions/Transitions";
=======
import { pageTransition } from "../App";
>>>>>>> parent of c592f96... Merge branch 'develop' into practitioner-profile
<<<<<<< HEAD
=======
=======
import { pageTransition } from "../App";
>>>>>>> parent of c592f96... Merge branch 'develop' into practitioner-profile
>>>>>>> parent of e9faf8f... ..
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
        <ContactCard />
        <ProfileInformation />
        <CallToAction />
      </motion.div>
    );
  }
}

export default PractitionerProfile;
