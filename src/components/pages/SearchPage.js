import React from "react";
import SearchField from "../search-components/SearchField";
import TherapyList from "../search-components/TherapyList";
import CallToAction from "../homepage-components/CallToAction";
import { pageTransition } from "../../transitions/Transitions";
import { motion } from "framer-motion";

class SearchPage extends React.Component {
  render() {
    return (
      <motion.div
        intial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
        className="searchPage"
      >
        <SearchField />
        <TherapyList />
        <CallToAction />
      </motion.div>
    );
  }
}

export default SearchPage;
