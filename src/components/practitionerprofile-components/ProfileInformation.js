import React from "react";
import "./ProfileInformation.css";

class ProfileInformation extends React.Component {
  render() {
    return (
      <div>
        <div className="container-fluid container-dimensions">
          {/* Practitioner Profile Image */}
          <div className="row">
            <div className="col-lg-8 no-padding">
          <img
            src={require("../../assets/images/placeholders/prac_profile_placeholder.jpg")}
            id="profile-image-frame"
          />
              {/* Practitioner Profile Details */}
                {/* Practitioner business logo */}
              <h3 style={{paddingTop: "30px"}}>
                Atma Studio Yoga
                <img
                  src={require("../../assets/images/placeholders/prac_logo_placeholder.jpg")}
                  id=""
                  class="practitioner-logo"
                />
              </h3>
                {/* Contact Details Card Column */}

              <p>Herval Medicine, Massage, Reiki</p>
              <p>Albany, Auckland</p>

              <p>Covered by ACC</p>
              <h5>Name</h5>
              <h5>About</h5>
              <p>
                Understanding your body's responses and tension patterns can
                help you understand the conscious choices you make and puts you
                back in charge of your own well-being. Experience day-to-day
                life in a positive, enjoyable and empowered way. Using the
                nurtured touch of Reflexology, positive reinforcement, sharing
                of knowledge, lifestyle support and a deep understanding of how
                the nervous system works I can help you achieve and maintain the
                best physical, mental and emotional energy.
              </p>

              <p>
                Insert <strong>"Read More"</strong> drop down button here when
                applicable
              </p>
            </div>

            <div className="col-lg-4 no-paddingPINK">
              <div className="contact-details-card">
                <div className="contact-card-body">
                  <h5>Contact Details</h5>
                  <h6>Atma Studio Yoga</h6>
                  <p>Name</p>
                  <p>184 Beech Road, Dairy Flat, (Street Name)</p>
                  <p>RD4 Albany, Auckland 0794</p>
                  <hr />
                  <h4>+64 (0)21 754 459 (phone number)</h4>
                  <hr />
                  <h4>gill@sbsltd.co.nz (email)</h4>
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
