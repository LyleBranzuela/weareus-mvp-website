import React from "react";
import CallToAction from "../homepage-components/CallToAction";
import { pageTransition } from "../../transitions/Transitions";
import { motion } from "framer-motion";

class PractitionerListPage extends React.Component {
  render() {
    return (
      <motion.div
        intial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
        className="practitionerList"
      >
        <CallToAction />
      </motion.div>
    );
  }
}

export default PractitionerListPage;
