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
        <PractitionerList />
        <CallToAction />
      </motion.div>
    );
  }
}

export default HomePage;
