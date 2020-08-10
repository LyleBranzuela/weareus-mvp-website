import React from "react";
import "./ProfileInformation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faAward,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

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
              <h2 className="practitioner-title">
                Atma Studio Yoga
                {/* Practitioner Business Logo Image */}
                <img
                  src={require("../../assets/images/placeholders/prac_logo_placeholder.jpg")}
                  alt="logo"
                  class="practitioner-logo"
                />
              </h2>
              {/* Practitioner Specialty Category/ies */}
              <span className="font-body" style={{ color: "#79158f" }}>
                Herval Medicine, Massage, Reiki
              </span>
              <br />
              {/* Location */}
              <span className="font-body">Albany, Auckland</span>
              <br />
              <br />
              <p className="font-body box">Covered by ACC</p>
              <h5 className="practitioner-name">Name</h5>
              <h5 className="title-header">About</h5>
              <p className="font-body">
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
                  Read More <BsChevronDown />
                </span>
              </div>
              <hr />
              <h5 className="title-header">
                Specialties <BsChevronDown className="arrow-style" />
              </h5>

              {/* Services Section */}
              <hr />
              <h5 className="title-header">
                Services <BsChevronDown className="arrow-style" />
              </h5>

              <ul className="service-list-style">
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
                Training, Qualifications & Memberships{" "}
                <BsChevronDown className="arrow-style" />
              </h5>
              {/* End of Services Section */}

              {/* Education section */}
              <h6 className="title-header">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  style={{ marginRight: "10px" }}
                />
                Diplomas
              </h6>
              <div className="font-body">
                <span>International Institute of Reflexology</span>
                <br />
                <span>Level 4 Anatomy & Physiology/Pathology (3 yrs)</span>
                <br />
                <br />
              </div>
              {/* End of Education Section */}

              {/* Certifications/Qualifications Section */}
              <h6 className="title-header">
                <FontAwesomeIcon
                  icon={faAward}
                  style={{ marginRight: "10px" }}
                />
                Certificates
              </h6>
              <div className="font-body">
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
                <FontAwesomeIcon
                  icon={faUserFriends}
                  style={{ marginRight: "10px" }}
                />
                Memberships
              </h6>
              <div className="font-body">
                {/* Show regular text IF link is NOT given */}
                <a>Reflexology Institute New Zealand</a>
                <br />
                {/* Show link if the IF the website is given */}
                <a href="" style={{ color: "#79158f" }}>
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
                      <span className="contact-card-practitioner-name">
                        Atma Studio Yoga
                      </span>
                      <br />
                      <span>Name</span>
                      <br />
                      <span>184 Beech Road, Dairy Flat,</span>
                      <br />
                      <span>RD4 Albany, Auckland 0794</span>
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
