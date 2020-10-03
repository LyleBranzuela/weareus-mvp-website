import React from "react";
import CallToAction from "../homepage-components/CallToAction";
import ImageCarousel from "../practitionerprofile-components/ImageCarousel";
import ProfileInformation from "../practitionerprofile-components/ProfileInformation";
import api from "../../api/api";

class PractitionerProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      company_id: "",
      logo: "",
      company_name: "",
      email: "",
      phone: "",
      about: "",
      suburb: "",
      city: "",
      company_address1: "",
      company_address2: "",
      subscription_type: "",
      accreditations: [],
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
        suburb: practitionerResponse.data.company_address1.split(",")[2],
        city: practitionerResponse.data.company_address2.split(",")[0],
        company_address1: practitionerResponse.data.company_address1,
        company_address2: practitionerResponse.data.company_address2,
        subscription_type: practitionerResponse.data.subscription_type,
        accreditations: practitionerResponse.data.accreditation,
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
    return this.state.specialists.length > 1 ? (
      <div className="practitionerPage"></div>
    ) : (
      <div className="practitionerPage">
        <ImageCarousel cover_images={this.state.cover_images} />
        <ProfileInformation {...this.state} />
        <CallToAction />
      </div>
    );
  }
}

export default PractitionerProfile;
