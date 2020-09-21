import React from "react";
import PageHeader from "../homepage-components/PageHeader";
import MessageOfTheDay from "../homepage-components/MessageOfTheDay";
import CallToAction from "../homepage-components/CallToAction";
import NewPractitionerList from "../practitioner-components/NewPractitionerList";
import PractitionerList from "../practitioner-components/PractitionerList";
import SearchField from "../search-components/SearchField";
import PractitionerCTA from "../for-practitioner-components/PractitionerCTA";
import CustomButton from "../general-components/CustomButton";
import { Link } from "react-router-dom";
import api from "../../api/api";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      practitioners: []
    };

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
    window.addEventListener('resize', this.handleWindowSizeChange);
    this._isMounted = true;
    this._isMounted && this.getAllPractitioners();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
    this._isMounted = false;
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;

    if (isMobile) {
      // Mobile version
      return (
        <div>
          <PageHeader
          learnMoreButton={
            <React.Fragment>
              <Link to="/for-practitioner">
                <CustomButton id="headerButtonMobile" text="Learn More" />
              </Link>
            </React.Fragment>
          }
        />
          <MessageOfTheDay
            motd={
              <React.Fragment>
                <br />
                <br />
                <strong>We are Us</strong> connects you with <br />
                health, wellness, and self-<br />
                improvement practitioners <br />
                throughout New Zealand. 
                <br />
                <br />
              </React.Fragment>
            }
          />
          <NewPractitionerList />
          <SearchField />
          <PractitionerCTA />
          <CallToAction />
        </div>
      );
    }
    else {
      // Desktop version
      return (
        <div>
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
          <SearchField />
          <PractitionerList 
          practitioners={this.state.practitioners}
          showAll={false} />
          <CallToAction />
        </div>
      );
    }
  }
}

export default HomePage;
