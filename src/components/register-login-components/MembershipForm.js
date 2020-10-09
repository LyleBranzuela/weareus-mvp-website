import "./MembershipForm.css";
import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import swal from "@sweetalert/with-react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { Link } from "react-router-dom";
import AWS from "aws-sdk";
import CustomButton from "../general-components/CustomButton";
import UserPool from "../../manage-accounts/UserPool";
import {
  AccountVerificationModal,
  getUser,
} from "../../manage-accounts/Accounts";
import { signin } from "../../actions";
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
      confirmPassword: "",
      verifiedAccount: false,
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
    if (this.props.isLogged) {
    } else {
      if (this.state.password === this.state.confirmPassword) {
        let userObject = {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          user_name: this.state.username,
          email: this.state.email,
          phone: this.state.phoneNumber,
          user_type: "user",
        };

        // Create Data Variables with key-value pairing
        let dataFirstName = {
          Name: "given_name",
          Value: userObject.first_name,
        };
        let dataLastName = {
          Name: "family_name",
          Value: userObject.last_name,
        };
        let dataEmail = {
          Name: "email",
          Value: userObject.email,
        };
        let dataPhoneNumber = {
          Name: "phone_number",
          Value: "+64" + userObject.phone,
        };
        let dataUsername = {
          Name: "preferred_username",
          Value: userObject.user_name,
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
          userObject.email,
          this.state.password,
          attributeList,
          null,
          async (err, data) => {
            if (err) {
              if (err.code === "UsernameExistsException") {
                // Error with Signing up
                swal({
                  title: "User Already Exists!",
                  text: "Would you like to login instead?",
                  icon: "error",
                  buttons: ["No", "Login"],
                }).then((value) => {
                  if (value === true) {
                    this.setState({ redirect: true });
                  }
                });
              } else {
                // Error with Signing up
                swal({
                  title: "Registration Unsuccessful!",
                  text: err.message,
                  icon: "error",
                  buttons: [false, true],
                });
              }
            } else {
              // If there's a duplicate data in the database, then remove the cognito user
              let duplicateUserFlag = false;
              try {
                userObject.reference_id = data.userSub;
                await api.post("/user", userObject);
              } catch (error) {
                duplicateUserFlag = true;
                const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(
                  {
                    accessKeyId: "AKIA2DSPNNEEZ3CSSBAF",
                    secretAccessKey: "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",
                    region: "ap-southeast-2",
                  }
                );
                const params = {
                  UserPoolId: data.user.pool.userPoolId,
                  Username: data.user.username,
                };
                cognitoidentityserviceprovider.adminDeleteUser(
                  params,
                  (err, data) => {
                    if (err) {
                      swal({
                        title: "Account Cleanup Error",
                        text: "Something went wrong of the account cleanup",
                        icon: "error",
                        buttons: [false, true],
                      });
                    } else {
                      swal({
                        title: "Database Error!",
                        text:
                          "User already exists in the database! Phone, email, or username already exists!",
                        icon: "error",
                        buttons: [false, true],
                      });
                    }
                  }
                );
              }
              // No Duplicates in the Database
              if (!duplicateUserFlag) {
                // Put the Reference ID (Generated by Cognito into the User Object)
                swal({
                  title: "Registration Successful!",
                  text: "You are now Registered!",
                  icon: "success",
                  buttons: [false, true],
                }).then((value) => {
                  if (value === true) {
                    // Account Verification Modal
                    AccountVerificationModal(
                      getUser(userObject.email.toLowerCase())
                    );
                    this.setState({ redirect: true });
                  }
                });
              }
            }
          }
        );
      } else {
        swal({
          title: "Incorrect Passwords!",
          text: "Incorrect username or password.",
          icon: "error",
          buttons: [false, true],
        });
      }
    }
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Container fluid>
        <Container className="membershipFormStyle">
          <Form id="membershipForm" onSubmit={this.onSubmit}>
            <h2>Membership Details</h2>
            <Row>
              {/** First Name Form Group */}
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name*</Form.Label>
                  <Form.Control
                    required
                    value={
                      this.props.user_information.first_name
                        ? this.props.user_information.first_name
                        : this.state.firstName
                    }
                    onChange={this.formOnChangeHandler}
                    type="text"
                    placeholder="First Name"
                    readOnly={this.props.user_information.first_name}
                  />
                </Form.Group>
              </Col>
              {/** Last Name Form Group */}
              <Col>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name*</Form.Label>
                  <Form.Control
                    required
                    value={
                      this.props.user_information.last_name
                        ? this.props.user_information.last_name
                        : this.state.lastName
                    }
                    onChange={this.formOnChangeHandler}
                    type="text"
                    placeholder="Last Name"
                    readOnly={this.props.user_information.last_name}
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
                    required
                    value={
                      this.props.user_information.email
                        ? this.props.user_information.email
                        : this.state.email
                    }
                    onChange={this.formOnChangeHandler}
                    type="text"
                    placeholder="Email"
                    readOnly={this.props.user_information.email}
                  />
                </Form.Group>
              </Col>
              {/** Phone Number Form Group */}
              <Col>
                <Form.Group controlId="phoneNumber">
                  <Form.Label>Phone Number*</Form.Label>
                  <Form.Control
                    required
                    value={
                      this.props.user_information.phone
                        ? this.props.user_information.phone
                        : this.state.phoneNumber
                    }
                    onChange={this.formOnChangeHandler}
                    type="number"
                    placeholder="Phone"
                    readOnly={this.props.user_information.phone}
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
                    required
                    value={
                      this.props.user_information.user_name
                        ? this.props.user_information.user_name
                        : this.state.username
                    }
                    onChange={this.formOnChangeHandler}
                    type="text"
                    placeholder="Your Username"
                    readOnly={this.props.user_information.user_name}
                  />
                </Form.Group>
              </Col>
            </Row>
            {this.props.isLogged && (
              <div>
                <Row>
                  {/** Account Password Form Group */}
                  <Col>
                    <Form.Group controlId="password">
                      <Form.Label>Create Account Password*</Form.Label>
                      <Form.Control
                        required
                        value={this.state.password}
                        onChange={this.formOnChangeHandler}
                        type="password"
                        placeholder="Password"
                      />
                      <Form.Text className="text-muted">
                        Password should be at least 6 characters, have a number,
                        an uppercase and a lower case letter.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  {/** Confirm Password Form Group */}
                  <Col>
                    <Form.Group controlId="confirmPassword">
                      <Form.Label>Confirm Password*</Form.Label>
                      <Form.Control
                        required
                        onChange={this.formOnChangeHandler}
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}

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
                        {`${this.props.location.state.subscriptionType} plan`}
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
                        {`$${this.props.location.state.price * 12} / year`}
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
    );
  }
}

// Setup Redux States
const mapStateToProps = (state) => {
  return {
    isLogged: state.userReducer.isLogged,
    user_information: state.userReducer.user_information,
  };
};

// Setup Redux Actions
const mapDispatchToProps = () => {
  return {
    signin,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(MembershipForm);
