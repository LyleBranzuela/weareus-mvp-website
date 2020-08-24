import React from "react";
import TopContent from "../aboutpage-components/TopContent";
import ClientSection from "../aboutpage-components/ClientSection";
import TeamSection from "../aboutpage-components/TeamSection";
import CallToAction from "../homepage-components/CallToAction";
import { pageTransition } from "../../transitions/Transitions";
import { motion } from "framer-motion";

class AboutPage extends React.Component {
  render() {
    return (
      <motion.div
        intial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
        className="aboutPage"
      >
        <TopContent />
        <ClientSection />
        <TeamSection />
        <CallToAction />
      </motion.div>
    );
  }
}

export default AboutPage;
