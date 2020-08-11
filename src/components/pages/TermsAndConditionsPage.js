import React from "react";
import { pageTransition } from "../App";
import { motion } from "framer-motion";
import TermsAndConditions from "../terms-and-conditions-components/TermsAndConditions";

class TermsAndConditionsPage extends React.Component {
  render() {
    return 
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
