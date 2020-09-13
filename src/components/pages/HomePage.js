import React from "react";
import PageHeader from "../homepage-components/PageHeader";
import MessageOfTheDay from "../homepage-components/MessageOfTheDay";
import CallToAction from "../homepage-components/CallToAction";
import NewPractitionerList from "../practitioner-components/NewPractitionerList";
import PractitionerList from "../practitioner-components/PractitionerList";
import SearchField from "../search-components/SearchField";
import { Link } from "react-router-dom";
import { pageTransition } from "../../transitions/Transitions";
import { motion } from "framer-motion";
import CustomButton from "../general-components/CustomButton";
import api from "../../api/api";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { services: [], regions: [], practitioners: [] };
    
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
    this._isMounted && this.setSearchKeywords();
    this._isMounted && this.getAllPractitioners();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <motion.div
        intial="in"
        animate="in"
        exit="out"
        variants={pageTransition}
        className="homePage"
      >
        <PageHeader
          learnMoreButton={
            <React.Fragment>
              <Link to="/for-practitioner">
                <CustomButton id="headerButton" text="Learn More" />
              </Link>
            </React.Fragment>
          }
        />
        <MessageOfTheDay
          motd={
            <React.Fragment>
              <strong>We are Us</strong> connects you with health, wellness, and
              self-improvement <br /> practitioners throughout New Zealand.
            </React.Fragment>
          }
        />
        <NewPractitionerList />
        <SearchField
          services={this.state.services}
          regions={this.state.regions}
        />
        <PractitionerList practitioners={this.state.practitioners} />
        <CallToAction />
      </motion.div>
    );
  }
}

export default HomePage;
