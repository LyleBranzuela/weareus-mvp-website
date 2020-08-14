import "./ProfileSetup.css";
import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";

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
        <Form.Group>
          <Form.Label>Size: 720px wide by 720px high</Form.Label>
          <Form.File id="profileSetupLogo" />
        </Form.Group>
        <hr size="50" />
        <h5>Your Profile Image</h5>
        {/** Profile Image Form Group */}
        <Form.Group>
          <Form.Label>
            This is where you put your headshot so people can put a face to a
            name. <br />
            Size: 720px wide by 720px high
          </Form.Label>
          <Form.File id="profileSetupLogo" />
        </Form.Group>
        <hr size="50" />
        <h5>Your Cover Image</h5>
        <hr size="50" />
        <h5>About your Practice</h5>
        <hr size="50" />
        <h5>Your Services</h5>
        <hr size="50" />
        <h5>Training, Qualifications, & Memberships</h5>
      </Form>
    </Container>
  );
};

export default ProfileSetup;
