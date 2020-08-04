import React from "react";
import "./ProfileInformation.css";

class ProfileInformation extends React.Component {
  render() {
    return (
      <div className="container-fluid container-dimensions">
        <img
          src={require("../../assets/images/placeholders/prac_profile_placeholder.jpg")}
          id="profile-image-frame"
        />
        <h3>Atma Studio Yoga</h3>
        <p>Herval Medicine, Massage, Reiki</p>
        <p>Albany, Auckland</p>

        <p>Covered by ACC</p>
        <h5>Name</h5>
        <h5>About</h5>
        <p>
          Understanding your body's responses and tension patterns can help you
          understand the conscious choices you make and puts you back in charge
          of your own well-being. Experience day-to-day life in a positive,
          enjoyable and empowered way. Using the nurtured touch of Reflexology,
          positive reinforcement, sharing of knowledge, lifestyle support and a
          deep understanding of how the nervous system works I can help you
          achieve and maintain the best physical, mental and emotional energy.
        </p>

        <p>
          Insert <strong>"Read More"</strong> drop down button here when
          applicable
        </p>
        <hr/>
        <h5>Specialties</h5>
        <p>
          Insert <strong>Specialties</strong> drop down section here
        </p>
        <hr/>
        <h5>Services</h5>
        <p>Insert dropdown menu here</p>
        <hr />
        <h5>Training, Qualifications & Memberships</h5>
        {/* Training/Education Details */}
        <h6>Diplomas</h6>
        <p>International Institute of Reflexology (Education Provider Name)</p>
        <p>Level 4 Anatomy & Physiology/Pathology (3 yrs) - (Name of education program)</p>
        {/* Qualifications/Certificates Details*/}
        <h6>Certificates</h6>
        <ul>
            <li>How Reflexology Helps with Conception, Pregnancy & Childbirth (3 yrs)</li>
            <li>Reflexology for the Me | Patient Cert</li>
            <li>How Reflexology helps cancer</li>
            <li>Coastal Paramedic</li>
            <li>Current First Aid</li>
        </ul>
        {/* Memberships Details */}
        <h6>Memberships</h6>
        {/* IF no website is given then show NO link */}
        <a>Reflexology Institute New Zealand</a>
        {/* IF there is a link */}
        <a href="">National Health Practitioners of New Zealand</a>
      </div>
    );
  }
}

export default ProfileInformation;
