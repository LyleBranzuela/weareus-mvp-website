import React from "react";
import CallToAction from "../homepage-components/CallToAction";
import PractitionerList from "../practitioner-components/PractitionerList";
import { pageTransition } from "../../transitions/Transitions";
import { motion } from "framer-motion";
import api from "../../api/api";

class PractitionerListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { practitioners: [] };
    
    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Get All The Practitioners from the Server
  getAllPractitioners = async () => {
    const practitionerResponse = await api.get("/companies");
    // Setting the Services and Regions States
    this._isMounted &&
      this.setState({
        practitioners: practitionerResponse.data.rows,
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getAllPractitioners();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <motion.div
        intial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
        className="practitionerList mt-5"
      >
        <PractitionerList />
        <CallToAction />
      </motion.div>
    );
  }
}

export default PractitionerListPage;
