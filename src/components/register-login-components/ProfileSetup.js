import "./ProfileSetup.css";
import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import CustomButton from "../general-components/CustomButton";
// import plus_circle_fill from "../../assets/icons/plus_circle_fill";
import api from "../../api/api";

class ProfileSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      accreditations: [],

      // Company Details States
      company_name: "",
      subscription_id: 0,
      logo: "",
      email: this.props.location.state.email
        ? this.props.location.state.email
        : "",
      phone: this.props.location.state.phone
        ? this.props.location.state.phone
        : "",
      about: "",
      country_name: "New Zealand",
      city_name: "",
      region_name: "",
      building_number: "",
      street: "",
      suburb: "",
      postal_code: "",
      chosen_accreditation: [],
      chosen_services: [],
      cover_images: [],

      // Practitioner (First Specialist) States
      reference_id: this.props.location.state.reference_id
        ? this.props.location.state.reference_id
        : "",
      profile_picture: "",
      diplomas: [],
      certifications: [],
      memberships: [],

      // Temporary Practitioner Placeholders (Holding Diplomas, Certificates, and Memberships Data)
      diploma_name: "",
      diploma_time_taken: "",
      certification_name: "",
      certification_time_taken: "",
      membership_name: "",
      membership_website: "",
    };
    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Set the Checkboxes for Accredations and Services
  setFormCheckboxes = async () => {
    // Getting the Services and Regions JSON From the Server
    const serviceResponse = await api.get("/lookup_services");
    const accreditationResponse = await api.get("/lookup_accreditation");

    // Setting the Services and Regions States
    this._isMounted &&
      this.setState({
        services: serviceResponse.data.rows,
        accreditations: accreditationResponse.data.rows,
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setFormCheckboxes();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Function to Submit Register Form (Email, Password, First and Last name, Phone Number, Preferred Username)
  onSubmit = async (event) => {
    event.preventDefault();
    let userObject = {
      // Company Details States
      company_name: this.state.company_name,
      subscription_id: this.state.subscription_id,
      logo: this.state.logo,
      email: this.state.email,
      phone: this.state.phone,
      about: this.state.about,
      country_name: this.state.country_name,
      city_name: this.state.city_name,
      region_name: this.state.region_name,
      building_number: this.state.building_number,
      street: this.state.street,
      suburb: this.state.suburb,
      postal_code: this.state.postal_code,
      chosen_accreditation: this.state.chosen_accreditation,
      chosen_services: this.state.chosen_services,
      cover_images: this.state.cover_images,

      // Practitioner (First Specialist) States
      reference_id: this.state.reference_id,
      profile_picture: this.state.profile_picture,
      diplomas: this.state.diplomas,
      certifications: this.state.certifications,
      memberships: this.state.memberships,
    };

    // Generate a Company
    await api.post("/company", userObject);
  };

  // Handles Any Active Changes on the Form
  formOnChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // Updates the Sections of Files with Images (company logo, profile picture, and cover images)
  onChangeImageHandler = (e, isArray) => {
    if (isArray) {
      this.setState({
        [e.target.id]: this.state[e.target.id].concat(e.target.files[0]),
      });
    } else {
      this.setState({
        [e.target.id]: e.target.files[0],
      });
    }
  };

  // Clears The List
  clearStateArray = (stateArray) => {
    this.setState({ [stateArray]: [] });
  };

  // Adds a Specific Credential to the Array
  addPractitionerCredential = (e, credential) => {
    e.preventDefault();
    let chosenCredentialObj = {};
    switch (credential) {
      case "diplomas":
        chosenCredentialObj = {
          diploma_name: this.state.diploma_name,
          time_taken: this.state.diploma_time_taken,
        };
        break;

      case "certifications":
        chosenCredentialObj = {
          certification_name: this.state.certification_name,
          time_taken: this.state.certification_time_taken,
        };
        break;

      case "memberships":
        chosenCredentialObj = {
          membership_name: this.state.membership_name,
          website: this.state.membership_website,
        };
        break;

      default:
        break;
    }

    // Add to the List
    this.setState({
      [credential]: [...this.state[credential], chosenCredentialObj],
    });
  };

  // Handles The Services/Accredation Checkboxes on the Form
  checkboxOnChangeHandler = (event, serviceType) => {
    // Array of Currently Chosen Services/Accredation
    let chosen_services_list = this.state[serviceType];
    let check = event.target.checked;
    let checked_service = event.target.value;

    if (check) {
      // Add the value of the checkbox to chosen services/accreditation array
      chosen_services_list.push(checked_service);
    } else {
      // Update the state with the new array of services/accreditation
      var index = chosen_services_list.indexOf(checked_service);
      if (index > -1) {
        chosen_services_list.splice(index, 1);
      }
    }

    // Update the Services Array State
    this.setState({
      [serviceType]: chosen_services_list,
    });
  };

  render() {
    // Map the dropdown items of Services
    let serviceKeywords = [];
    if (this.state.services) {
      serviceKeywords = this.state.services.map((service) => {
        return (
          <label
            id={`service-${service.service_id}`}
            key={service.service_id}
            className="serviceContainer container"
          >
            {service.service_name}
            <input
              type="checkbox"
              name={service.service_name}
              value={service.service_id}
              onChange={(e) => {
                this.checkboxOnChangeHandler(e, "chosen_services");
              }}
            />
            <span className="checkBoxFill"></span>
          </label>
        );
      });
    }
    // Map the checkboxes of accreditations
    let accreditationBoxes = [];
    if (this.state.accreditations) {
      accreditationBoxes = this.state.accreditations.map((accreditation) => {
        return (
          <label
            id={`accreditation-${accreditation.accreditation_id}`}
            key={accreditation.accreditation_id}
            className="serviceContainer container"
          >
            {accreditation.accreditation_name}
            <input
              type="checkbox"
              name={accreditation.accreditation_name}
              value={accreditation.accreditation_id}
              onChange={(e) => {
                this.checkboxOnChangeHandler(e, "chosen_accreditation");
              }}
            />
            <span className="checkBoxFill"></span>
          </label>
        );
      });
    }
    return (
      <Container className="profileSetupStyle">
        {/** Profile Setup Header  */}
        <h2>Profile Set-up</h2>
        <h5>
          Great, now that you are one of Us, we want to get you started in the
          best possible way.
        </h5>
        <p>
          So before you get started, ensure you check out our{" "}
          <span>
            <u>how-to-guide</u>
          </span>{" "}
          we've put together for you on how to showcase your business as it
          provides you with templates and information so you can put your best
          foot forward.
        </p>
        <span>
          <u>Download profile how-to-guide</u>
        </span>
        <hr size="50" />
        <Form>
          <h5>Your Profile Name</h5>
          {/** Profile Name Form Group */}
          <Form.Group controlId="company_name">
            <Form.Label>
              This is the name that gets highlighted on your We are Us page.
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Profile Name"
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          <hr size="50" />
          <h5>Your Contact Details</h5>
          {this.props.location.state.first_name &&
            this.props.location.state.last_name && (
              <Row>
                <Col>
                  {/** First Name Form Group */}
                  <Form.Group controlId="first_name">
                    <Form.Label>Your First Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      defaultValue={this.props.location.state.first_name}
                      onChange={this.formOnChangeHandler}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {/** Last Name Form Group */}
                  <Form.Group controlId="last_name">
                    <Form.Label>Your Last Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Last Name"
                      defaultValue={this.props.location.state.last_name}
                      onChange={this.formOnChangeHandler}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
            )}
          <Row>
            <Col>
              {/** Contact Number Form Group */}
              <Form.Group controlId="phone">
                <Form.Label>Your Company's Contact Phone Number:</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={this.state.phone}
                  placeholder="Enter Contact Number"
                  onChange={this.formOnChangeHandler}
                  readOnly={this.props.location.state.phone ? true : false}
                />
              </Form.Group>
            </Col>
            <Col>
              {/** Contact Email Form Group */}
              <Form.Group controlId="email">
                <Form.Label>Your Company's Contact Email:</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={this.state.email}
                  placeholder="Enter Email"
                  onChange={this.formOnChangeHandler}
                  readOnly={this.props.location.state.email ? true : false}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {/** Building Name/Number Form Group */}
              <Form.Group controlId="building_number">
                <Form.Label>Building Name/Number:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Building Name/Number"
                  onChange={this.formOnChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col>
              {/** Contact Email Form Group */}
              <Form.Group controlId="street">
                <Form.Label>Street:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Street"
                  onChange={this.formOnChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {/** Town/Suburb Form Group */}
              <Form.Group controlId="suburb">
                <Form.Label>Town/Suburb:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Town/Suburb"
                  onChange={this.formOnChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col>
              {/** Postcode Form Group */}
              <Form.Group controlId="postal_code">
                <Form.Label>Postcode:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Postcode"
                  onChange={this.formOnChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              {/** City Form Group */}
              <Form.Group controlId="city_name">
                <Form.Label>City:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  onChange={this.formOnChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr size="50" />
          <h5>Your Logo</h5>
          {/** Logo Form Group */}
          <Form.Group controlId="company_logo">
            <Form.Label>Size: 720px wide by 720px high</Form.Label>
            <br />
            {/** Upload Logo */}
            <label className="custom-file-upload">
              <input
                id="company_logo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  this.onChangeImageHandler(e, false);
                }}
              />
              <u>Change Image</u>
            </label>
          </Form.Group>
          <hr size="50" />
          <h5>Your Profile Image</h5>
          {/** Profile Image Form Group */}
          <Form.Group controlId="profile_picture">
            <p>{this.state.profile_picture}</p>
            <Form.Label>
              This is where you put your headshot so people can put a face to a
              name. <br />
              Size: 720px wide by 720px high
            </Form.Label>
            <br />
            {/** Upload Profile Image */}
            <label className="custom-file-upload">
              <input
                id="profile_picture"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  this.onChangeImageHandler(e, false);
                }}
              />
              <u>Change Image</u>
            </label>
          </Form.Group>
          <hr size="50" />
          <div>{this.state.cover_images}</div>
          <h5>Your Cover Image</h5>
          {/** Cover Image Form Group */}
          <Form.Group controlId="cover_images">
            <Form.Label>
              Remember your photo is what people see first. In a blink of an eye
              they'll make a decision about your business, so make sure all
              images show trust, confidence, professionalism, and personality.
              Size: 1440px wide by 520px high (this ensures faster loading of
              your listing)
            </Form.Label>
            <Row>
              <Col>
                <br />
                {/** Upload Cover Image */}
                <label className="custom-file-upload">
                  <input
                    id="cover_images"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      this.onChangeImageHandler(e, true);
                    }}
                  />
                  <u>Change Image</u>
                </label>
              </Col>
              <Col></Col>
            </Row>
          </Form.Group>
          <hr size="50" />
          <h5>About your Practice</h5>
          {/** About Practice Form Group */}
          <Form.Group controlId="profileSetupAboutPractices">
            <Form.Label>
              First impressions count. The first 120 characters, or about 20
              words, is what shows if you're featured on the home page after
              launch, and on your profile page the first 70 words of the first
              paragraph are shown on your listing. The best length for your copy
              is the time it takes to get your key message across.
            </Form.Label>
            <Form.Control as="textarea" rows="5" />
          </Form.Group>
          <hr size="50" />
          <h5>Your Services</h5>
          {/** Accredation Services Form Group */}
          <Form.Group controlId="profileSetupAccredation">
            {accreditationBoxes}
          </Form.Group>
          {/** Practitioner's Services Form Group */}
          <Form.Group controlId="profileSetupServices">
            <Form.Label>Search Service:</Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Begin typing your service eg. Acupuncture..."
            />
            <Form.Label>Or select from the following list:</Form.Label>
            <Container className="checkboxContainerList">
              {serviceKeywords}
            </Container>
          </Form.Group>
          {/** Other Practitioner's Services Form Group */}
          <Form.Group controlId="profileSetupOtherServices">
            <Form.Label>Other:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <hr size="50" />
          <h5>Training, Qualifications, & Memberships</h5>
          <h6>A note about what this is and how many words.</h6>
          {/** Practitioner's Qualifications - Practitioner Diplomas Form Group */}
          <Form.Group controlId="diploma_name">
            <Form.Label className="qualificationLabel">
              <img
                alt="Graduation Hat"
                src={require("../../assets/icons/icon_diploma.svg")}
              />
              My Diplomas
            </Form.Label>
            <span
              className="addAnotherIcon"
              onClick={(e) => {
                this.addPractitionerCredential(e, "diplomas");
              }}
            >
              <img
                src={require("../../assets/icons/plus_circle_fill.svg")}
                alt="plus_circle_fill"
              />
              <u>Add another</u>
            </span>
            {/** Render Created Diplomas */}
            {this.state.diplomas &&
              this.state.diplomas.map((diploma, index) => {
                return (
                  <Form.Group key={`${index}-${diploma.diploma_name}`}>
                    <Form.Control
                      type="text"
                      placeholder={`${diploma.diploma_name} (${diploma.time_taken})`}
                      readOnly
                    />
                  </Form.Group>
                );
              })}
            <Form.Control
              as="textarea"
              rows="3"
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          {/** Practitioner's Qualifications - Practitioner Diploma/Training Time Form Group */}
          <Form.Group controlId="diploma_time_taken">
            <Form.Label>Time taken to complete training (optional)</Form.Label>
            <Form.Control type="text" onChange={this.formOnChangeHandler} />
          </Form.Group>
          {/** Practitioner's Qualifications - Practitioner Certificates Form Group */}
          <Form.Group controlId="certification_name">
            <Form.Label className="qualificationLabel">
              <img
                alt="Certificate Ribbon"
                src={require("../../assets/icons/icon_certificate.svg")}
              />
              My Certificates
            </Form.Label>
            <span
              className="addAnotherIcon"
              onClick={(e) => {
                this.addPractitionerCredential(e, "certifications");
              }}
            >
              <img
                src={require("../../assets/icons/plus_circle_fill.svg")}
                alt="plus_circle_fill"
              />
              <u>Add another</u>
            </span>
            {/** Render Created Certifications */}
            {this.state.certifications &&
              this.state.certifications.map((certification, index) => {
                return (
                  <Form.Group
                    key={`${index}-${certification.certification_name}`}
                  >
                    <Form.Control
                      type="text"
                      placeholder={`${certification.certification_name} (${certification.time_taken})`}
                      readOnly
                    />
                  </Form.Group>
                );
              })}
            <Form.Control
              as="textarea"
              rows="3"
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          {/** Practitioner's Qualifications - Practitioner Diploma/Training Time Form Group */}
          <Form.Group controlId="certification_time_taken">
            <Form.Label>Time taken to complete training (optional)</Form.Label>
            <Form.Control type="text" onChange={this.formOnChangeHandler} />
          </Form.Group>
          {/** Practitioner's Qualifications - Practitioner Memberships Form Group */}
          <Form.Group controlId="membership_name">
            <Form.Label className="qualificationLabel">
              <img
                alt="Membership Group"
                src={require("../../assets/icons/icon_memberships.svg")}
              />
              My Memberships
            </Form.Label>
            <span
              className="addAnotherIcon"
              onClick={(e) => {
                this.addPractitionerCredential(e, "memberships");
              }}
            >
              <img
                src={require("../../assets/icons/plus_circle_fill.svg")}
                alt="plus_circle_fill"
              />
              <u>Add another</u>
            </span>
            {/** Render Created Certifications */}
            {this.state.memberships &&
              this.state.memberships.map((membership, index) => {
                return (
                  <Form.Group key={`${index}-${membership.membership_name}`}>
                    <Form.Control
                      type="text"
                      placeholder={`${membership.membership_name} (${membership.website})`}
                      readOnly
                    />
                  </Form.Group>
                );
              })}
            <Form.Control
              as="textarea"
              rows="3"
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          {/** Practitioner's Qualifications - Practitioner Website Form Group */}
          <Form.Group controlId="membership_website">
            <Form.Label>Website (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="http://"
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          {/** Save Profile Button */}
          <CustomButton id="saveProfileButton" type="submit" text="Save" />
        </Form>
      </Container>
    );
  }
}

export default ProfileSetup;
