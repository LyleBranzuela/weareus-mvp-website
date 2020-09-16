import "./MembershipForm.css";
import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { pageTransition } from "../../transitions/Transitions";
import CustomButton from "../general-components/CustomButton";
import UserPool from "../../manage-accounts/UserPool";
import {
  googleSignInCallBack,
  facebookSignInCallBack,
} from "../../manage-accounts/Accounts";
import GoogleLogin from "react-google-login";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import api from "../../api/api";

class MembershipForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "", // Shown as given_name for AWS Cognito
      lastName: "", // Shown as family_name for AWS Cognito
      email: "",
      phoneNumber: "",
      username: "", // Shown as preferred_username for AWS Cognito
      password: "",
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Handles Any Active Changes on the Form
  formOnChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // Function to Submit Register Form (Email, Password, First and Last name, Phone Number, Preferred Username)
  onSubmit = (event) => {
    event.preventDefault();
    let userObject = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      user_name: this.state.username,
      email: this.state.email,
      phone: "+64" + this.state.phoneNumber,
      user_type: "customer",
    };

    // Create Data Variables with key-value pairing
    let dataFirstName = {
      Name: "given_name",
      Value: this.state.firstName,
    };
    let dataLastName = {
      Name: "family_name",
      Value: this.state.lastName,
    };
    let dataEmail = {
      Name: "email",
      Value: this.state.email,
    };
    let dataPhoneNumber = {
      Name: "phone_number",
      Value: "+64" + this.state.phoneNumber,
    };
    let dataUsername = {
      Name: "preferred_username",
      Value: this.state.username,
    };

    // Create the Attributes List of CognitoUserAttributes
    var attributeGivenName = new CognitoUserAttribute(dataFirstName);
    var attributeFamilyName = new CognitoUserAttribute(dataLastName);
    var attributeEmail = new CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
    var attributePreferredUsername = new CognitoUserAttribute(dataUsername);

    // Push the new CognitoUserAttributes to the Attributes List
    var attributeList = [];
    attributeList.push(attributeGivenName);
    attributeList.push(attributeFamilyName);
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);
    attributeList.push(attributePreferredUsername);

    // Signup the Account
    UserPool.signUp(
      this.state.email,
      this.state.password,
      attributeList,
      null,
      async (err, data) => {
        if (err) {
          console.error(err); // Error with Signing up
        } else {
          console.log(data); // Successful Sign up
          userObject.reference_id = data.userSub;
          await api.post("/user", userObject);
        }
      }
    );
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <motion.div
        intial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
      >
        <Container fluid>
          <Container className="membershipFormStyle">
            <Form id="membershipForm" onSubmit={this.onSubmit}>
              <Row className="mb-5">
                <div
                  className="fb-login-button"
                  data-size="large"
                  data-button-type="continue_with"
                  data-layout="default"
                  data-auto-logout-link="true"
                  data-use-continue-as="false"
                  data-width=""
                  data-onsuccess={facebookSignInCallBack}
                ></div>
                <GoogleLogin
                  clientId="423149440415-l1v06tlarr297mkbv1oh5g2jv0pgdrv3.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={googleSignInCallBack}
                  cookiePolicy={"single_host_origin"}
                />
              </Row>
              <h2>Membership Details</h2>
              <Row>
                {/** First Name Form Group */}
                <Col>
                  <Form.Group controlId="firstName">
                    <Form.Label>First Name*</Form.Label>
                    <Form.Control
                      value={this.state.firstName}
                      onChange={this.formOnChangeHandler}
                      type="text"
                      placeholder="First Name"
                    />
                  </Form.Group>
                </Col>
                {/** Last Name Form Group */}
                <Col>
                  <Form.Group controlId="lastName">
                    <Form.Label>Last Name*</Form.Label>
                    <Form.Control
                      value={this.state.lastName}
                      onChange={this.formOnChangeHandler}
                      type="text"
                      placeholder="Last Name"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {/** Email Address Form Group */}
                <Col>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address*</Form.Label>
                    <Form.Control
                      value={this.state.email}
                      onChange={this.formOnChangeHandler}
                      type="text"
                      placeholder="Email"
                    />
                  </Form.Group>
                </Col>
                {/** Phone Number Form Group */}
                <Col>
                  <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number*</Form.Label>
                    <Form.Control
                      value={this.state.phoneNumber}
                      onChange={this.formOnChangeHandler}
                      type="number"
                      placeholder="Phone"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {/** Account Username Form Group */}
                <Col>
                  <Form.Group controlId="username">
                    <Form.Label>Account Username*</Form.Label>
                    <Form.Control
                      value={this.state.username}
                      onChange={this.formOnChangeHandler}
                      type="text"
                      placeholder="Your Username"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {/** Account Password Form Group */}
                <Col>
                  <Form.Group controlId="password">
                    <Form.Label>Create Account Password*</Form.Label>
                    <Form.Control
                      value={this.state.password}
                      onChange={this.formOnChangeHandler}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {/** Confirm Password Form Group */}
                <Col>
                  <Form.Group controlId="confirmPassword">
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
                        <span className="orderFormSection">
                          Recurring Totals
                        </span>
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
  }
}

export default MembershipForm;
