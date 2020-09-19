import React from "react";
import ContactInfo from "../contactpage-components/ContactInfo";
import { pageTransition } from "../App";
import { motion } from "framer-motion";

class ContactUs extends React.Component {
  render() {
    return (
      <motion.div
        intial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
      >
        <ContactInfo />
      </motion.div>
    );
  }
}

export default ContactUs;
