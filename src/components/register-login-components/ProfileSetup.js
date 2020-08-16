import "./ProfileSetup.css";
import React from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { servicesList } from "../App";

const ProfileSetup = () => {
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
        <Form.Group controlId="profileSetupProfileName">
          <Form.Label>
            This is the name that gets highlighted on your We are Us page.
          </Form.Label>
          <Form.Control type="text" placeholder="Enter Profile Name" />
        </Form.Group>
        <hr size="50" />
        <h5>Your Contact Details</h5>
        {/** User Name Form Group */}
        <Form.Group controlId="profileSetupUserName">
          <Form.Label>Your Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
        </Form.Group>
        <Row>
          <Col>
            {/** Contact Number Form Group */}
            <Form.Group controlId="profileSetupContactNo">
              <Form.Label>Your Contact Phone Number:</Form.Label>
              <Form.Control type="number" placeholder="Enter Contact Number" />
            </Form.Group>
          </Col>
          <Col>
            {/** Contact Email Form Group */}
            <Form.Group controlId="profileSetupEmail">
              <Form.Label>Your Contact Email:</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {/** Building Name/Number Form Group */}
            <Form.Group controlId="profileSetupBuilding">
              <Form.Label>Building Name/Number:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Building Name/Number"
              />
            </Form.Group>
          </Col>
          <Col>
            {/** Contact Email Form Group */}
            <Form.Group controlId="profileSetupStreet">
              <Form.Label>Street:</Form.Label>
              <Form.Control type="text" placeholder="Enter Street" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {/** Town/Suburb Form Group */}
            <Form.Group controlId="profileSetupSuburb">
              <Form.Label>Town/Suburb:</Form.Label>
              <Form.Control type="text" placeholder="Enter Town/Suburb" />
            </Form.Group>
          </Col>
          <Col>
            {/** Postcode Form Group */}
            <Form.Group controlId="profileSetupPostcode">
              <Form.Label>Postcode:</Form.Label>
              <Form.Control type="number" placeholder="Enter Postcode" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            {/** City Form Group */}
            <Form.Group controlId="profileSetupCity">
              <Form.Label>City:</Form.Label>
              <Form.Control type="text" placeholder="Enter City" />
            </Form.Group>
          </Col>
        </Row>
        <hr size="50" />
        <h5>Your Logo</h5>
        {/** Logo Form Group */}
        <Form.Group controlId="profileSetupLogo">
          <Form.Label>Size: 720px wide by 720px high</Form.Label>
          <br />
          {/** Upload Logo */}
          <label class="custom-file-upload">
            <input id="profileSetupLogo" type="file" />
            <u>Change Image</u>
          </label>
        </Form.Group>
        <hr size="50" />
        <h5>Your Profile Image</h5>
        {/** Profile Image Form Group */}
        <Form.Group controlId="profileSetupProfileImage">
          <Form.Label>
            This is where you put your headshot so people can put a face to a
            name. <br />
            Size: 720px wide by 720px high
          </Form.Label>
          <br />
          {/** Upload Profile Image */}
          <label class="custom-file-upload">
            <input id="profileSetupProfileImage" type="file" />
            <u>Change Image</u>
          </label>
        </Form.Group>
        <hr size="50" />
        <h5>Your Cover Image</h5>
        {/** Cover Image Form Group */}
        <Form.Group controlId="profileSetupCoverImage">
          <Form.Label>
            Remember your photo is what people see first. In a blink of an eye
            they'll make a decision about your business, so make sure all images
            show trust, confidence, professionalism, and personality. Size:
            1440px wide by 520px high (this ensures faster loading of your
            listing)
          </Form.Label>
          <Row>
            <Col>
              <br />
              {/** Upload Cover Image */}
              <label class="custom-file-upload">
                <input id="profileSetupCoverImage" type="file" />
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
          <label id="accAccredation" className="serviceContainer container">
            ACC acredited service
            <input type="checkbox" />
            <span className="checkBoxFill"></span>
          </label>
          <label
            id="healthInsuranceAccredation"
            className="serviceContainer container"
          >
            Health insurance accredited service
            <input type="checkbox" />
            <span className="checkBoxFill"></span>
          </label>
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
            {servicesList.placeholderList.map((service) => (
              <label
                id={`service-${service}`}
                className="serviceContainer container"
              >
                {service}
                <input type="checkbox" />
                <span className="checkBoxFill"></span>
              </label>
            ))}
          </Container>
        </Form.Group>
        {/** Other Practitioner's Services Form Group */}
        <Form.Group controlId="profileSetupOtherServices">
          <Form.Label>Other:</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <hr size="50" />
        <h5>Training, Qualifications, & Memberships</h5>
        <Form.Label>A note about what this is and how many words.</Form.Label>
        {/** Practitioner's Qualifications - Practitioner Diplomas Form Group */}
        <Form.Group controlId="profileSetupDiplomas">
          <Form.Label className="qualificationLabel">
            <img
              alt="Graduation Hat"
              src={require("../../assets/icons/icon_diploma.svg")}
            />
            My Diplomas
          </Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
        {/** Practitioner's Qualifications - Practitioner Training Time Form Group */}
        <Form.Group controlId="profileSetupTraining">
          <Form.Label>Time taken to complete training (optional)</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        {/** Practitioner's Qualifications - Practitioner Certificates Form Group */}
        <Form.Group controlId="profileSetupCertificates">
          <Form.Label className="qualificationLabel">
            <img
              alt="Certificate Ribbon"
              src={require("../../assets/icons/icon_certificate.svg")}
            />
            My Certificates
          </Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
        {/** Practitioner's Qualifications - Practitioner Memberships Form Group */}
        <Form.Group controlId="profileSetupMemberships">
          <Form.Label className="qualificationLabel">
            <img
              alt="Membership Group"
              src={require("../../assets/icons/icon_memberships.svg")}
            />
            My Memberships
          </Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
        {/** Practitioner's Qualifications - Practitioner Website Form Group */}
        <Form.Group controlId="profileSetupWebsite">
          <Form.Label>Website (optional)</Form.Label>
          <Form.Control type="text" placeholder="http://" />
        </Form.Group>
        {/** Save Profile Button */}
        <Button
          className="primaryCustomButtonStyle"
          id="saveProfileButton"
          variant="primary"
          type="submit"
        >
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default ProfileSetup;
