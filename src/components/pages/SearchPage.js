import React from "react";
import SearchField from "../search-components/SearchField";
import TherapyList from "../search-components/TherapyList";
import CallToAction from "../homepage-components/CallToAction";
import { pageTransition } from "../../transitions/Transitions";
import { motion } from "framer-motion";
import api from "../../api/api";

class SearchPage extends React.Component {
  state = { services: [], regions: [] };

  // Function to Set the Search Keywords or Terms
  setSearchKeywords = async () => {
    // Getting the Services and Regions JSON From the Server
    const serviceResponse = await api.get("/lookup_services");
    const regionResponse = await api.get("/regions");

    // Setting the Services and Regions States
    this.setState({
      services: serviceResponse.data.rows.map(
        (service) => service.service_name
      ),
      regions: regionResponse.data.rows.map((region) => region.region_name),
    });
  };

  componentDidMount() {
    this.setSearchKeywords();
  }

  render() {
    return (
      <motion.div
        intial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
        className="searchPage"
      >
        <SearchField
          services={this.state.services}
          regions={this.state.regions}
        />
        <TherapyList services={this.state.services} />
        <CallToAction />
      </motion.div>
    );
  }
}

export default SearchPage;
