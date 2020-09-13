import React from "react";
import "./ContactCard.css";

class ContactCard extends React.Component {
  render() {
    return (
      /* Contact Card Column*/
      <div className="container-fluid contact-card-container-dimensions">
        <div className="col-sm-4 no-padding position-right">
          {/* <div style={{ width: "390px" }}> */}
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
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default ContactCard;
