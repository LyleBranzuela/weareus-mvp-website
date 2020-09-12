import React from "react";
import TermsAndConditions from "../terms-and-conditions-components/TermsAndConditions";
import { pageTransition } from "../../transitions/Transitions";
import { motion } from "framer-motion";

class TermsAndConditionsPage extends React.Component {
  render() {
    return (
      <motion.div
        intial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
        className="tacPageStyle"
      >
        <TermsAndConditions />
      </motion.div>
    );
  }
}

export default TermsAndConditionsPage;
