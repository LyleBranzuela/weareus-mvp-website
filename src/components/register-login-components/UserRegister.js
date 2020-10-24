import "./UserRegister.css";
import React from "react";
import { Container, Form, Row, Col, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CustomButton from "../general-components/CustomButton";
import UserPool from "../../manage-accounts/UserPool";
import {
  cognitoDetails,
  AccountVerificationModal,
  getUser,
} from "../../manage-accounts/Accounts";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import swal from "@sweetalert/with-react";
import AWS from "aws-sdk";
import api from "../../api/api";

class UserRegister extends React.Component {
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
      redirect: false,
      registrationStage: false,
      
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ redirect: false });
  }

  componentWillUnmount() {
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
    if (this.state.password === this.state.confirmPassword) {
      this.setState({ registrationStage: true });
      swal({
        title: "Processing your Registration!",
        content: (
          <div>
            <Spinner
              as="span"
              animation="border"
              role="status"
              aria-hidden="true"
            />
            <br />
            <br />
            <span>Please wait for a few seconds...</span>
          </div>
        ),
        buttons: [false, false],
        closeOnClickOutside: false,
        closeOnEsc: false,
      });
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
              // Close The Registration Processing Modal
              swal.close();
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
                this.setState({ registrationStage: false });
              });
            } else {
              // Close The Registration Processing Modal
              swal.close();
              // Error with Signing up
              swal({
                title: "Registration Unsuccessful!",
                text: err.message,
                icon: "error",
                buttons: [false, true],
              });
              this.setState({ registrationStage: false });
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
                  accessKeyId: cognitoDetails.accessKeyId,
                  secretAccessKey: cognitoDetails.secretAccessKey,
                  region: cognitoDetails.region,
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
                    // Close The Registration Processing Modal
                    swal.close();
                    swal({
                      title: "Account Cleanup Error",
                      text: "Something went wrong with the account cleanup",
                      icon: "error",
                      buttons: [false, true],
                    });
                    this.setState({ registrationStage: false });
                  } else {
                    // Close The Registration Processing Modal
                    swal.close();
                    swal({
                      title: "Database Error!",
                      text: error?.response?.data || "Unknown Error",
                      icon: "error",
                      buttons: [false, true],
                    });
                    this.setState({ registrationStage: false });
                  }
                }
              );
            }
            // No Duplicates in the Database
            if (!duplicateUserFlag) {
              // Close The Registration Processing Modal
              swal.close();
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
                  this.setState({ redirect: true, registrationStage: false });
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
  };

  render() {
    // Redirect to home if finished registering
    if (this.state.redirect) {
      if (this.props.isLoggedIn) {
        return <Redirect to="home" />;
      } else {
        return <Redirect to="login" />;
      }
    }

    return (
      <Container fluid>
        <Container className="userRegisterFormStyle">
          <Form id="userRegisterForm" onSubmit={this.onSubmit}>
            <h2>Register as User</h2>
            <Row>
              {/** First Name Form Group */}
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name*</Form.Label>
                  <Form.Control
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
                    value={this.state.password}
                    onChange={this.formOnChangeHandler}
                    type="password"
                    placeholder="Password"
                  />
                  <Form.Text className="text-muted">
                    Password should be at least 6 characters, have a number, an
                    uppercase and a lower case letter.
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
            <Row>
              {/** Section: Register Button */}
              <CustomButton
                disabled={this.state.registrationStage}
                id="registerUserButton"
                type="submit"
                text="Register"
              />
            </Row>
          </Form>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps())(UserRegister);
