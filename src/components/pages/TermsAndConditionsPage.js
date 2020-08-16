import React from "react";
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
        Terms and Condition
      </motion.div>
    );
  }
}

export default TermsAndConditionsPage;
