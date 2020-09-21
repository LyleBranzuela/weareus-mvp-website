import React from "react";
import CallToAction from "../homepage-components/CallToAction";
import ImageCarousel from "../practitionerprofile-components/ImageCarousel";
import ProfileInformation from "../practitionerprofile-components/ProfileInformation";
import { useParams } from "react-router-dom";
import api from "../../api/api";

class TempPractitionerProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      company_id: "",
      logo: "",
      company_name: "",
      email: "",
      phone: "",
      about: "",
      company_address1: "",
      company_address2: "",
      subscription_type: "",
      accredation: [],
      services: [],
      specialists: [],
      cover_images: [],
      reviews: [],
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Gets the Practitioner (Company) Details from the Server
  getCompanyDetails = async () => {
    let company_id = this.props.match.params.company_id;
    console.log(company_id);
    const practitionerResponse = await api.get(
      `/company-profile/${company_id}`
    );

    // Setting the Practitioner Detail's States
    this._isMounted &&
      this.setState({
        company_id: practitionerResponse.data.company_id,
        logo: practitionerResponse.data.logo,
        company_name: practitionerResponse.data.company_name,
        email: practitionerResponse.data.email,
        phone: practitionerResponse.data.phone,
        about: practitionerResponse.data.about,
        company_address1: practitionerResponse.data.company_address1,
        company_address2: practitionerResponse.data.company_address2,
        subscription_type: practitionerResponse.data.subscription_type,
        accredation: practitionerResponse.data.accredation,
        services: practitionerResponse.data.services,
        specialists: practitionerResponse.data.specialists,
        cover_images: practitionerResponse.data.cover_images,
        reviews: practitionerResponse.data.reviews,
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getCompanyDetails();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Update Search whenever the URL is changed
  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.company_id !== prevProps.match.params.company_id
    ) {
      this.getCompanyDetails();
    }
  }

  render() {
    return (
      <div className="mt-5 pt-5 practitionerPage">
        <p>{this.state.company_id}</p>
        <p>{this.state.logo}</p>
        <p>{this.state.company_name}</p>
        <p>{this.state.email}</p>
        <p>{this.state.phone}</p>
        <p>{this.state.about}</p>
        <p>{this.state.company_address1}</p>
        <p>{this.state.company_address2}</p>
        <p>{this.state.subscription_type}</p>
      </div>
    );
  }
}

export default TempPractitionerProfile;
