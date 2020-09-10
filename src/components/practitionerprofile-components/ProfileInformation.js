import React from "react";
import "./ProfileInformation.css";
import icon_diploma from "../../assets/icons/icon_diploma.svg";
import icon_certificate from "../../assets/icons/icon_certificate.svg";
import icon_memberships from "../../assets/icons/icon_memberships.svg";
import icon_accordion_arrow from "../../assets/icons/accordion_arrow.svg";
import icon_accordion_arrow_upwards from "../../assets/icons/accordion_arrow_upwards.svg";
import icon_accordion_arrow_purple from "../../assets/icons/accordion_arrow_purple.svg";
import icon_accordion_arrow_upwards_purple from "../../assets/icons/accordion_arrow_upwards_purple.svg";

class ProfileInformation extends React.Component {
  render() {
    return (
      <div>
        <div className="container-fluid container-dimensions">
          <div className="row">
            <div className="col-lg-8 no-padding">
              {/* Practitioner Profile Image */}
              <img
                src={require("../../assets/images/placeholders/prac_profile_placeholder.jpg")}
                id="profile-image-frame"
                alt="profile image"
              />

              {/* Practitioner Business Name */}
              <h2 className="practitioner-title" id="practitioner-name">
                Atma Studio Yoga
                {/* Practitioner Business Logo Image */}
                <img
                  src={require("../../assets/images/placeholders/prac_logo_placeholder.jpg")}
                  alt="logo"
                  class="practitioner-logo"
                />
              </h2>

              {/* Practitioner Specialty Category/ies */}

              <div id="category">
                <span id="category-text">Herbal Medicine, Massage, Reiki</span>
              </div>
              
              {/* Location */}
              <div id="location">
                <span id="suburb">Albany, </span>
                <span id="city"> Auckland</span>
              </div>

              <br />
              <br />
              <p className="box">Covered by ACC</p>
              <h5 className="practitioner-name" id="person-name">
                Name
              </h5>

              <h5 className="title-header">About</h5>
              <p className="font-body" id="about">
                Understanding your body's responses and tension patterns can
                help you understand the conscious choices you make and puts you
                back in charge of your own well-being. Experience day-to-day
                life in a positive, enjoyable and empowered way. Using the
                nurtured touch of Reflexology, positive reinforcement, sharing
                of knowledge, lifestyle support and a deep understanding of how
                the nervous system works I can help you achieve and maintain the
                best physical, mental and emotional energy.
              </p>

              <div className="read-more-button">
                <span>
                  Read More{" "}
                  <img
                    src={icon_accordion_arrow_purple}
                    className="read-more-arrow"
                  ></img>
                </span>
              </div>
              <hr />
              <h5 className="title-header">
                Specialties
                <img
                  src={icon_accordion_arrow}
                  className="arrow-position"
                ></img>
              </h5>

              {/* Services Section */}
              <hr />
              <h5 className="title-header">
                Services
                <img
                  src={icon_accordion_arrow}
                  className="arrow-position"
                ></img>
              </h5>

              <ul className="service-list-style" id="services">
                <li>
                  <h5>Reflexology</h5>
                </li>
                <li>
                  <h5>Reiki</h5>
                </li>
                <li>
                  <h5>Metamorphosis</h5>
                </li>
                <li>
                  <h5>Energy Balance</h5>
                </li>
              </ul>
              <hr />
              <h5 className="title-header">
                Training, Qualifications & Memberships
                <img
                  src={icon_accordion_arrow_upwards}
                  className="arrow-position"
                ></img>
              </h5>
              {/* End of Services Section */}

              {/* Education section */}
              <h6 className="title-header">
                <img src={icon_diploma} style={{ paddingRight: "5px" }}></img>
                Diplomas
              </h6>
              <div className="font-body" id="education">
                <span>International Institute of Reflexology</span>
                <br />
                <span>Level 4 Anatomy & Physiology/Pathology (3 yrs)</span>
                <br />
                <br />
              </div>
              {/* End of Education Section */}

              {/* Certifications/Qualifications Section */}
              <h6 className="title-header">
                <img
                  src={icon_certificate}
                  style={{ paddingRight: "5px" }}
                ></img>
                Certificates
              </h6>
              <div className="font-body" id="certificates">
                <span>
                  How Reflexology Helps with Conception, Pregnancy & Childbirth
                  (3 yrs)
                </span>
                <br />
                <span>Reflexology for the Me | Patient Cert</span>
                <br />
                <span>How Reflexology helps Cancer</span>
                <br />
                <span>Coastal Paramedic</span>
                <br />
                <span>Current First Aid</span>
                <br />
                <br />
              </div>

              {/* Organisation memberships */}
              <h6 className="title-header">
                <img
                  src={icon_memberships}
                  style={{ paddingRight: "5px" }}
                ></img>
                Memberships
              </h6>
              <div className="font-body" id="memberships">
                {/* Show regular text IF link is NOT given */}
                <a id="membership-no-link">Reflexology Institute New Zealand</a>
                <br />
                {/* Show link if the IF the website is given */}
                <a href="" style={{ color: "#79158f" }} id="membership-link">
                  <u>National Health Practitioners of New Zealand</u>
                </a>
              </div>
            </div>

            {/* Contact Card Column*/}
            <div className="col-sm-4 no-padding">
              <div style={{ width: "390px" }}>
                <div className="contact-details-card">
                  <div className="contact-card-body">
                    <h5 className="contact-card-title">Contact Details</h5>
                    <div style={{ fontSize: "18px" }}>
                      <span
                        className="contact-card-practitioner-name"
                        id="practitioner-name"
                      >
                        Atma Studio Yoga
                      </span>
                      <br />
                      <span id="person-name">Name</span>
                      <br />
                      <span id="str-no">184 </span>
                      <span id="str-name">Beech Road,</span>
                      <span id="region">Dairy Flat,</span>
                      <br />
                      <span id="suburb">RD4 Albany,</span>
                      <span id="city"> Auckland </span>
                      <span id="postcode">0794</span>
                    </div>
                    <hr />
                    {/* Phone Number */}

                    <h5 className="contact-card-personal">+64 (0)21 754 459</h5>
                    <hr />
                    {/* Email */}
                    <h5 className="contact-card-personal">gill@sbsltd.co.nz</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileInformation;
