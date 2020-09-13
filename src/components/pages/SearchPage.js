import React from "react";
import SearchField from "../search-components/SearchField";
import TherapyList from "../search-components/TherapyList";
import CallToAction from "../homepage-components/CallToAction";
import { pageTransition } from "../../transitions/Transitions";
import { motion } from "framer-motion";
import api from "../../api/api";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { services: [], regions: [] };
    
    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Set the Search Keywords or Terms
  setSearchKeywords = async () => {
    // Getting the Services and Regions JSON From the Server
    const serviceResponse = await api.get("/lookup_services");
    const regionResponse = await api.get("/regions");

    // Setting the Services and Regions States
    this._isMounted &&
      this.setState({
        services: serviceResponse.data.rows.map(
          (service) => service.service_name
        ),
        regions: regionResponse.data.rows.map((region) => region.region_name),
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setSearchKeywords();
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
