import React from "react";
import "./ContactCard.css";
import { Card } from "react-bootstrap";

class ContactCard extends React.Component {
  render() {
    return (
      /* Contact Card Column*/
      // <div className="container-fluid contact-card-container-dimensions">
      //   <div className="col-sm-4 no-padding position-right">
      //     <div className="contact-details-card">
      //       <div className="contact-card-body">
      //         <h5 className="contact-card-title">Contact Details</h5>
      //         <div style={{ fontSize: "18px" }}>
      //           <span
      //             className="contact-card-practitioner-name"
      //             id="practitioner-name"
      //           >
      //             Atma Studio Yoga
      //           </span>
      //           <br />
      //           <span id="person-name">Name</span>
      //           <br />
      //           <span id="str-no">184 </span>
      //           <span id="str-name">Beech Road,</span>
      //           <span id="region">Dairy Flat,</span>
      //           <br />
      //           <span id="suburb">RD4 Albany,</span>
      //           <span id="city"> Auckland </span>
      //           <span id="postcode">0794</span>
      //         </div>
      //         <hr />
      //         <h5 className="contact-card-personal">+64 (0)21 754 459</h5>
      //         <hr />
      //         <h5 className="contact-card-personal">gill@sbsltd.co.nz</h5>
      //       </div>
      //     </div>

      //   </div>
      // </div>
      <Card className="contact-card-box">
        <Card.Body>
          <Card.Title>Contact Details</Card.Title>
          <Card.Subtitle>
            {/* Practitioner Name */}
            Atma Studio Yoga
          </Card.Subtitle>
          <Card.Text>
            Name
            <br />
            184 Beech Road, Diary Flat,
            <br />
            RD4 Albany, Auckland 0794
            <hr />
            <h5 id="purple-card-heading">+64 (0)21 754 459</h5>
            <hr />
            <h5 id="purple-card-heading">gill@sbsltd.co.nz</h5>
           
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ContactCard;
