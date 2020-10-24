import "./ProfileSetup.css";
import React from "react";
import { Container, Form, Row, Col, Carousel, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CustomButton from "../general-components/CustomButton";
import swal from "@sweetalert/with-react";
import { profilesetup } from "../../actions";
import api from "../../api/api";

class ProfileSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      accreditations: [],
      specialties: [],
      cities: [],
      regions: [],
      search_filter: "",
      coverImageLimit: 0,
      generatedCompanyId: "",
      redirect: false,
      registerFlag: false,

      // Company Details States
      company_name: "",
      logo: "",
      email: this.props.user_information.email,
      phone: this.props.user_information.phone,
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
      user_id: this.props.user_information.user_id,
      profile_picture: "",
      diplomas: [],
      certifications: [],
      memberships: [],
      chosen_specialties: [],

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
    try {
      const serviceResponse = await api.get("/lookup_services");
      const accreditationResponse = await api.get("/lookup_accreditation");
      const citiesResponse = await api.get("/cities");
      const regionsResponse = await api.get("/regions");

      // Setting the Services and Regions States
      this._isMounted &&
        this.setState({
          services: serviceResponse.data.rows,
          accreditations: accreditationResponse.data.rows,
          cities: citiesResponse.data.rows,
          regions: regionsResponse.data.rows,
        });
    } catch (error) {
      swal({
        title: "Database Error!",
        text: error?.response?.data || "Unknown Get Error",
        icon: "error",
        buttons: [false, true],
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setFormCheckboxes();

    let limit = 0;
    if (this.props?.user_information?.subscription_id) {
      switch (this.props.user_information.subscription_id) {
        case 1:
          limit = 1;
          break;

        case 2:
          limit = 5;
          break;

        default:
          break;
      }
    }
    this.setState({ coverImageLimit: limit });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Function to check if the field is empty or not
  checkField = (field, tag) => {
    if (field !== "" || field) {
      return tag;
    }
  };

  // Function to Submit Register Form (Email, Password, First and Last name, Phone Number, Preferred Username)
  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ registerFlag: true });

    // Error Handling (Front End Checks)
    let errorMessage = "";
    if (this.state.cover_images.length < 1) {
      errorMessage = `Please add at least 1 Cover Image`;
    } else if (this.state.chosen_services.length < 1) {
      errorMessage = `Please add at least 1 Service`;
    } else if (this.state.logo === "") {
      errorMessage = `Please add your logo`;
    } else if (this.state.profile_picture === "") {
      errorMessage = `Please add your profile picture`;
    }

    if (errorMessage !== "") {
      // Close The Register Processing Modal
      swal({
        title: "Unsuccessful Registration!",
        text: errorMessage,
        icon: "error",
        buttons: [false, true],
      });
      this.setState({ registerFlag: false });
    } else {
      swal({
        title: "Processing your Registration!",
        content: (
          <div>
            <Spinner
              as="span"
              animation="border"
              role="status"
              aria-hidden="true"
            />
            <br />
            <br />
            <span>Please wait for a few seconds...</span>
          </div>
        ),
        buttons: [false, false],
        closeOnClickOutside: false,
        closeOnEsc: false,
      });
      let companyObject = {
        // Company Details States
        company_name: this.state.company_name,
        subscription_id: this.props.user_information.subscription_id,
        logo: this.state.logo,
        email: this.state.email,
        phone: this.state.phone,
        about: this.state.about,
        country_name: "New Zealand",
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
        user_id: this.state.user_id,
        profile_picture: this.state.profile_picture,
        diplomas: this.state.diplomas,
        certifications: this.state.certifications,
        memberships: this.state.memberships,
        chosen_specialties: this.state.chosen_specialties,
      };

      // Generate a Company
      try {
        const response = await api.post("/company", companyObject);

        // Close The Register Processing Modal
        swal.close();
        swal({
          title: "Profile Setup Successful!",
          text: "Your Profile is now Setup! Redirecting you to your profile...",
          icon: "success",
          timer: 5000,
          closeOnClickOutside: false,
          closeOnEsc: false,
          buttons: [false, true],
        }).then((value) => {
          // Update Redux Object
          this.props.profilesetup(response.data.company_id);
          // Redirect them to their generated company
          this.setState({
            redirect: true,
            generatedCompanyId: response.data.company_id,
            registerFlag: false,
          });
        });
      } catch (error) {
        // Close The Register Processing Modal
        swal.close();
        swal({
          title: "Database Error!",
          text: error?.response?.data || "Unknown Error",
          icon: "error",
          buttons: [false, true],
        });
        this.setState({ registerFlag: false });
      }
    }
  };

  // Handles Any Active Changes on the Form
  formOnChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // Updates the Sections of Files with Images (company logo, profile picture, and cover images)
  onChangeImageHandler = async (e) => {
    const target = e.target.id;
    if (e.target.files[0]) {
      const data = new FormData();
      data.append("image", e.target.files[0]);
      const uploadResponse = await api.post(
        "/upload?user_id=" + this.state.user_id + "&folder=" + e.target.id,
        data
      );
      if (target !== "cover_images") {
        this.setState({
          [target]: uploadResponse.data.fileName,
        });
      } else {
        if (this.state.cover_images.length < this.state.coverImageLimit) {
          this.setState({
            cover_images: this.state.cover_images.concat([
              uploadResponse.data.fileName,
            ]),
          });
        } else {
          swal({
            title: "Cover Image Limit Reached!",
            text:
              "You only have a limit of " +
              this.state.coverImageLimit +
              " cover images.",
            icon: "error",
            buttons: [false, true],
          });
        }
      }
    }
  };

  // Adds a Specific Credential to the Array
  addPractitionerCredential = (e, credential) => {
    e.preventDefault();
    let chosenCredentialObj = {};
    let errorFlag = false;
    let errorMessage = "";
    switch (credential) {
      case "diplomas":
        if (
          this.state.diploma_name === "" ||
          !this.state.diploma_name ||
          !this.state.diploma_name.replace(/\s/g, "").length
        ) {
          // Unsuccessful Addition of Pracititoner Modal
          errorMessage = "Please input a Diploma";
          errorFlag = true;
        } else {
          chosenCredentialObj = {
            diploma_name: this.state.diploma_name.trim(),
            time_taken: this.state.diploma_time_taken.trim(),
          };
          this.setState({
            diploma_name: "",
            diploma_time_taken: "",
          });
        }
        break;

      case "certifications":
        if (
          this.state.certification_name === "" ||
          !this.state.certification_name ||
          !this.state.certification_name.replace(/\s/g, "").length
        ) {
          // Unsuccessful Addition of Pracititoner Modal
          errorMessage = "Please input a Certification";
          errorFlag = true;
        } else {
          chosenCredentialObj = {
            certification_name: this.state.certification_name.trim(),
            time_taken: this.state.certification_time_taken.trim(),
          };
          this.setState({
            certification_name: "",
            certification_time_taken: "",
          });
        }
        break;

      case "memberships":
        if (
          this.state.membership_name === "" ||
          !this.state.membership_name ||
          !this.state.membership_name.replace(/\s/g, "").length
        ) {
          // Unsuccessful Addition of Pracititoner Modal
          errorMessage = "Please input a Membership";
          errorFlag = true;
        } else {
          chosenCredentialObj = {
            membership_name: this.state.membership_name.trim(),
            website: this.state.membership_website.trim(),
          };
          this.setState({
            membership_name: "",
            membership_website: "",
          });
        }
        break;

      default:
        break;
    }

    if (!errorFlag) {
      // Add to the List
      this.setState({
        [credential]: [...this.state[credential], chosenCredentialObj],
      });
    } else {
      swal({
        title: "Unsuccessful Addition of the Credential!",
        text: errorMessage,
        icon: "error",
        buttons: [false, true],
      });
    }
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
      let filteredServices = this.state.services;
      if (this.state.search_filter && this.state.search_filter !== "") {
        filteredServices = this.state.services.filter((service) => {
          return service.service_name
            .toLowerCase()
            .includes(this.state.search_filter.toLowerCase());
        });
      }
      serviceKeywords = filteredServices.map((service) => {
        let check = this.state.chosen_services.indexOf(
          service.service_id.toString()
        );
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
              checked={check !== -1}
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

    // Map the checkboxes of accreditations
    let regionSelections = [];
    if (this.state.regions) {
      regionSelections = this.state.regions.map((region) => {
        return (
          <option key={region.region_id} value={region.region_name}>
            {region.region_name}
          </option>
        );
      });
    }

    // Map the Options for Selections of Cities
    let citySelections = [];
    if (this.state.cities) {
      citySelections = this.state.cities.map((city) => {
        return (
          <option key={city.city_id} value={city.city_name}>
            {city.city_name}
          </option>
        );
      });
    }

    // Redirect to their generated Profile
    if (this.state.redirect) {
      return (
        <Redirect
          to={`practitioner-profile/${this.state.generatedCompanyId}`}
        />
      );
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
          <a
            style={{ color: "black" }}
            href="/we_are_us_perfecting_your_profile_guide.pdf"
            download
          >
            <u>how-to-guide</u>
          </a>{" "}
          we've put together for you on how to showcase your business as it
          provides you with templates and information so you can put your best
          foot forward.
        </p>
        <a
          style={{ color: "black" }}
          href="/we_are_us_perfecting_your_profile_guide.pdf"
          download
        >
          <u>Download profile how-to-guide</u>
        </a>
        <hr size="50" />
        <Form onSubmit={this.onSubmit}>
          <h5>Your Company Name</h5>
          {/** Company Name Form Group */}
          <Form.Group controlId="company_name">
            <Form.Label>
              This is the name that gets highlighted on your We are Us page.
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Company Name"
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          <hr size="50" />
          <h5>Your Contact Details</h5>
          <Row>
            <Col>
              {/** First Name Form Group */}
              <Form.Group controlId="first_name">
                <Form.Label>Your First Name:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter First Name"
                  defaultValue={this.props.user_information.first_name}
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
                  required
                  type="text"
                  placeholder="Enter Last Name"
                  defaultValue={this.props.user_information.last_name}
                  onChange={this.formOnChangeHandler}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {/** Contact Number Form Group */}
              <Form.Group controlId="phone">
                <Form.Label>Your Company's Contact Phone Number:</Form.Label>
                <Form.Control
                  required
                  type="number"
                  defaultValue={this.state.phone}
                  placeholder="Enter Contact Number"
                  onChange={this.formOnChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col>
              {/** Contact Email Form Group */}
              <Form.Group controlId="email">
                <Form.Label>Your Company's Contact Email:</Form.Label>
                <Form.Control
                  required
                  type="email"
                  defaultValue={this.state.email}
                  placeholder="Enter Email"
                  onChange={this.formOnChangeHandler}
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
            <Col sm={6}>
              {/** City Form Group */}
              <Form.Group controlId="region_name">
                <Form.Label>Region:</Form.Label>
                <Form.Control
                  required
                  as="select"
                  type="text"
                  defaultValue=""
                  placeholder="Enter Region"
                  onChange={this.formOnChangeHandler}
                >
                  <option value="" disabled>
                    Select Region
                  </option>
                  {regionSelections}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={6}>
              {/** City Form Group */}
              <Form.Group controlId="city_name">
                <Form.Label>City:</Form.Label>
                <Form.Control
                  required
                  as="select"
                  type="text"
                  defaultValue=""
                  placeholder="Enter City"
                  onChange={this.formOnChangeHandler}
                >
                  <option value="" disabled>
                    Select City
                  </option>
                  {citySelections}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {/** Town/Suburb Form Group */}
              <Form.Group controlId="suburb">
                <Form.Label>Town/Suburb:</Form.Label>
                <Form.Control
                  required
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
          <hr size="50" />
          <h5>Your Logo</h5>
          {/** Logo Form Group */}
          <Form.Group controlId="logo">
            <Form.Label>Size: 150px wide by 150px high</Form.Label>
            <br />
            {this.state.logo ? (
              <div>
                <img
                  style={{ width: 150, height: 150 }}
                  alt="company-logo-placeholder"
                  src={this.state.logo}
                ></img>
                <br />
              </div>
            ) : (
              <div>
                <img
                  style={{ width: 150, height: 150 }}
                  alt="company-logo-placeholder"
                  src={require("../../assets/images/placeholders/logo_placeholder.PNG")}
                ></img>
                <br />
              </div>
            )}
            {/** Upload Logo */}
            <label className="custom-file-upload">
              <input
                id="logo"
                type="file"
                accept="image/*"
                name="logo"
                onChange={(e) => {
                  this.onChangeImageHandler(e);
                }}
              />
              <u>Change Image</u>
            </label>
          </Form.Group>
          <hr size="50" />
          <h5>Your Profile Image</h5>
          {/** Profile Image Form Group */}
          <Form.Group controlId="profile_picture">
            <Form.Label>
              This is where you put your headshot so people can put a face to a
              name. <br />
              Size: 150px wide by 150px high
            </Form.Label>
            <br />
            {this.state.profile_picture ? (
              <div className="mt-2">
                <img
                  style={{ width: 150, height: 150 }}
                  alt="profile-pic"
                  src={this.state.profile_picture}
                ></img>
                <br />
              </div>
            ) : (
              <div className="mt-2">
                <img
                  style={{ width: 150, height: 150 }}
                  alt="profile-pic-placeholder"
                  src={require("../../assets/images/placeholders/profile_picture_placeholder.PNG")}
                ></img>
                <br />
              </div>
            )}
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
          <h5>Your Cover Image</h5>
          {/** Cover Image Form Group */}
          <Form.Group controlId="cover_images">
            <Form.Label>
              Remember your photo is what people see first. In a blink of an eye
              they'll make a decision about your business, so make sure all
              images show trust, confidence, professionalism, and personality.
              Size: 1440px wide by 520px high (this ensures faster loading of
              your listing)
              <br />
              <br />
              {this.state.cover_images.length > 0 ? (
                this.state.cover_images.length > 1 ? (
                  <div className="mt-2">
                    <Carousel autoPlay>
                      {this.state.cover_images.map((cover_image, index) => {
                        return (
                          <Carousel.Item key={index}>
                            <img
                              style={{ width: 740, height: 250 }}
                              alt="carousel-pic"
                              src={cover_image}
                            ></img>
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                  </div>
                ) : (
                  <div className="mt-2">
                    <img
                      style={{ width: 740, height: 250 }}
                      alt="carousel-pic"
                      src={this.state.cover_images[0]}
                    ></img>
                  </div>
                )
              ) : (
                <div className="mt-2">
                  <img
                    style={{ width: 740, height: 250 }}
                    alt="carousel-pic-placeholder"
                    src={require("../../assets/images/placeholders/upload_placeholder.PNG")}
                  ></img>
                </div>
              )}
            </Form.Label>
            <Row>
              <Col>
                {/** Upload Cover Image */}
                {this.state.cover_images.length > 0 && (
                  <label
                    className="custom-file-upload"
                    onClick={(e) => {
                      let tempCoverImages = this.state.cover_images;
                      console.log(tempCoverImages);
                      if (this.state.cover_images.length === 1) {
                        tempCoverImages = [];
                      } else {
                        tempCoverImages = tempCoverImages.splice(-1, 1);
                      }
                      this.setState({
                        cover_images: tempCoverImages,
                      });
                      console.log(this.state.cover_images);
                    }}
                  >
                    <u>
                      Delete Last Image (Total: {this.state.cover_images.length}
                      )
                    </u>
                  </label>
                )}
                <label className="custom-file-upload addAnotherIcon">
                  <input
                    id="cover_images"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      this.onChangeImageHandler(e, true);
                    }}
                  />
                  <img
                    src={require("../../assets/icons/plus_circle_fill.svg")}
                    alt="plus_circle_fill"
                  />
                  <u>Add Another (Max: {this.state.coverImageLimit} Images)</u>
                </label>
              </Col>
            </Row>
          </Form.Group>
          <hr size="50" />
          <h5>About your Practice</h5>
          {/** About Practice Form Group */}
          <Form.Group controlId="about">
            <Form.Label>
              First impressions count. The first 120 characters, or about 20
              words, is what shows if you're featured on the home page after
              launch, and on your profile page the first 70 words of the first
              paragraph are shown on your listing. The best length for your copy
              is the time it takes to get your key message across.
            </Form.Label>
            <Form.Control
              required
              as="textarea"
              rows="5"
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          <hr size="50" />
          <h5>Your Services</h5>
          {/** Accredation Services Form Group */}
          <Form.Group controlId="profileSetupAccredation">
            {accreditationBoxes}
          </Form.Group>
          {/** Practitioner's Services Form Group */}
          <Form.Group controlId="search_filter">
            <Form.Label>Search Service:</Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Begin typing your service eg. Acupuncture..."
              onChange={this.formOnChangeHandler}
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
                  <div
                    className="customTrainingStyle"
                    key={`${index}-${diploma.diploma_name}`}
                  >
                    <Row>
                      <Col sm={11}>
                        <Form.Control
                          type="text"
                          placeholder={`${diploma.diploma_name} ${
                            diploma.time_taken && "(" + diploma.time_taken + ")"
                          }`}
                          readOnly
                        />
                      </Col>
                      <Col sm={1}>
                        <CustomButton
                          text="x"
                          onClick={() => {
                            let splicedDiplomas = this.state.diplomas;
                            splicedDiplomas.splice(index, 1);
                            this.setState({
                              diplomas: splicedDiplomas,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                  </div>
                );
              })}
            <Form.Control
              as="textarea"
              rows="3"
              value={this.state.diploma_name}
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          {/** Practitioner's Qualifications - Practitioner Diploma/Training Time Form Group */}
          <Form.Group controlId="diploma_time_taken">
            <Form.Label>Time taken to complete training (optional)</Form.Label>
            <Form.Control
              type="text"
              value={this.state.diploma_time_taken}
              onChange={this.formOnChangeHandler}
            />
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
                  <div
                    className="customTrainingStyle"
                    key={`${index}-${certification.certification_name}`}
                  >
                    <Row>
                      <Col sm={11}>
                        <Form.Control
                          type="text"
                          placeholder={`${certification.certification_name} ${
                            certification.time_taken &&
                            "(" + certification.time_taken + ")"
                          }`}
                          readOnly
                        />
                      </Col>
                      <Col sm={1}>
                        <CustomButton
                          text="-"
                          onClick={() => {
                            let splicedCertifications = this.state
                              .certifications;
                            splicedCertifications.splice(index, 1);
                            this.setState({
                              certifications: splicedCertifications,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                  </div>
                );
              })}
            <Form.Control
              as="textarea"
              rows="3"
              value={this.state.certification_name}
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          {/** Practitioner's Qualifications - Practitioner Diploma/Training Time Form Group */}
          <Form.Group controlId="certification_time_taken">
            <Form.Label>Time taken to complete training (optional)</Form.Label>
            <Form.Control
              type="text"
              value={this.state.certification_time_taken}
              onChange={this.formOnChangeHandler}
            />
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
                  <div
                    className="customTrainingStyle"
                    key={`${index}-${membership.membership_name}`}
                  >
                    <Row>
                      <Col sm={11}>
                        <Form.Control
                          type="text"
                          placeholder={`${membership.membership_name} ${
                            membership.website && "(" + membership.website + ")"
                          }`}
                          readOnly
                        />
                      </Col>
                      <Col sm={1}>
                        <CustomButton
                          text="-"
                          onClick={() => {
                            let splicedMemberships = this.state.memberships;
                            splicedMemberships.splice(index, 1);
                            this.setState({
                              memberships: splicedMemberships,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                  </div>
                );
              })}
            <Form.Control
              as="textarea"
              rows="3"
              value={this.state.membership_name}
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          {/** Practitioner's Qualifications - Practitioner Website Form Group */}
          <Form.Group controlId="membership_website">
            <Form.Label>Website (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="http://"
              value={this.state.membership_website}
              onChange={this.formOnChangeHandler}
            />
          </Form.Group>
          {/** Save Profile Button */}
          <CustomButton
            disabled={this.state.registerFlag}
            id="saveProfileButton"
            type="submit"
            text="Save"
          />
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  user_information: state.userReducer.user_information,
});

const mapDispatchToProps = () => {
  return {
    profilesetup,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(ProfileSetup);
