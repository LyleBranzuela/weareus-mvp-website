import "./MembershipForm.css";
import React, { useContext, useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { pageTransition } from "../../transitions/Transitions";
import CustomButton from "../general-components/CustomButton";
import UserPool from "../../manage-accounts/UserPool";
import { AccountContext } from "../../manage-accounts/Accounts";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

const MembershipForm = () => {
  // Set User Account's Attributes' States
  const [firstName, setFirstName] = useState(""); // Shown as given_name for AWS Cognito
  const [lastName, setLastName] = useState(""); // Shown as family_name for AWS Cognito
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState(""); // Shown as preferred_username for AWS Cognito
  const [password, setPassword] = useState("");

  const { facebookSignInCallBack, googleSignInCallBack } = useContext(
    AccountContext
  );

  // Create Data Variables with key-value pairing
  var dataFirstName = {
    Name: "given_name",
    Value: firstName,
  };
  var dataLastName = {
    Name: "family_name",
    Value: lastName,
  };
  var dataEmail = {
    Name: "email",
    Value: email,
  };
  var dataPhoneNumber = {
    Name: "phone_number",
    Value: "+64" + phoneNumber,
  };
  var dataUsername = {
    Name: "preferred_username",
    Value: username,
  };

  // Create the Attributes List of CognitoUserAttributes
  var attributeList = [];
  var attributeGivenName = new CognitoUserAttribute(dataFirstName);
  var attributeFamilyName = new CognitoUserAttribute(dataLastName);
  var attributeEmail = new CognitoUserAttribute(dataEmail);
  var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
  var attributePreferredUsername = new CognitoUserAttribute(dataUsername);

  // Push the new CognitoUserAttributes to the Attributes List
  attributeList.push(attributeGivenName);
  attributeList.push(attributeFamilyName);
  attributeList.push(attributeEmail);
  attributeList.push(attributePhoneNumber);
  attributeList.push(attributePreferredUsername);

  // Function to Submit Register Form (Email, Password, First and Last name, Phone Number, Preferred Username)
  const onSubmit = (event) => {
    event.preventDefault();
    UserPool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
      }
    });
  };

  return (
    <motion.div intial="out" animate="in" exit="out" variants={pageTransition}>
      <Container fluid>
        <Container className="membershipFormStyle">
          <div class="g-signin2" data-onsuccess={googleSignInCallBack}></div>
          <div
            class="fb-login-button"
            data-size="large"
            data-button-type="continue_with"
            data-layout="default"
            data-auto-logout-link="false"
            data-use-continue-as="false"
            data-width=""
            data-onsuccess={facebookSignInCallBack}
          ></div>
          <Form id="membershipForm" onSubmit={onSubmit}>
            <h2>Membership Details</h2>
            <Row>
              {/** First Name Form Group */}
              <Col>
                <Form.Group controlId="memberFormGroupFirstName">
                  <Form.Label>First Name*</Form.Label>
                  <Form.Control
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    type="text"
                    placeholder="First Name"
                  />
                </Form.Group>
              </Col>
              {/** Last Name Form Group */}
              <Col>
                <Form.Group controlId="memberFormGroupLastName">
                  <Form.Label>Last Name*</Form.Label>
                  <Form.Control
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    type="text"
                    placeholder="Last Name"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/** Email Address Form Group */}
              <Col>
                <Form.Group controlId="memberFormGroupEmail">
                  <Form.Label>Email Address*</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="text"
                    placeholder="Email"
                  />
                </Form.Group>
              </Col>
              {/** Phone Number Form Group */}
              <Col>
                <Form.Group controlId="memberFormGroupPhone">
                  <Form.Label>Phone Number*</Form.Label>
                  <Form.Control
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    type="number"
                    placeholder="Phone"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/** Account Username Form Group */}
              <Col>
                <Form.Group controlId="memberFormGroupUsername">
                  <Form.Label>Account Username*</Form.Label>
                  <Form.Control
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    type="text"
                    placeholder="Your Username"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/** Account Password Form Group */}
              <Col>
                <Form.Group controlId="memberFormGroupPassword">
                  <Form.Label>Create Account Password*</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/** Confirm Password Form Group */}
              <Col>
                <Form.Group controlId="memberFormGroupConfirmPassword">
                  <Form.Label>Confirm Password*</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Group>
              </Col>
            </Row>
            {/** Total Cost Calculator Section */}
            <Container className="totalCostContainer">
              <Row>
                <Col>
                  <h2>Your Order</h2>
                  <hr size="50" />
                  {/** Section: Membership Type */}
                  <Row>
                    <Col sm={3}>
                      <span className="orderFormSection">Membership</span>
                    </Col>
                    <Col sm={9}>
                      <span className="orderDataSection" id="orderMembership">
                        Standard Membership
                      </span>
                    </Col>
                  </Row>
                  <hr size="50" />
                  {/** Section: Total Amount */}
                  <Row>
                    <Col sm={3}>
                      <span className="orderFormSection">Total</span>
                    </Col>
                    <Col sm={9}>
                      <span className="orderDataSection" id="orderTotal">
                        $0000 / year
                      </span>
                    </Col>
                  </Row>
                  <hr size="50" />
                  {/** Section: Recurring Totals Amount */}
                  <Row>
                    <Col sm={3}>
                      <span className="orderFormSection">Recurring Totals</span>
                    </Col>
                    <Col sm={9}>
                      <span
                        className="orderDataSection"
                        id="orderRecurringTotal"
                      >
                        $0000 (Includes $22.35 GST)/year (renewal: July 23,
                        2019)
                      </span>
                    </Col>
                  </Row>
                  <hr size="50" />
                  {/** Section: Pay Button */}
                  <CustomButton
                    id="paymentFormButton"
                    type="submit"
                    text="Payment"
                  />
                </Col>
              </Row>
            </Container>
          </Form>
        </Container>
      </Container>
    </motion.div>
  );
};

export default MembershipForm;
