import "./MembershipForm.css";
import React from "react";
import { Container, Form, Row, Col, Spinner } from "react-bootstrap";
import swal from "@sweetalert/with-react";
import { connect } from "react-redux";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { Redirect } from "react-router-dom";
import { logout } from "../../manage-accounts/Accounts";
import { signout } from "../../actions";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import AWS from "aws-sdk";
import CustomButton from "../general-components/CustomButton";
import UserPool from "../../manage-accounts/UserPool";
import {
  cognitoDetails,
  AccountVerificationModal,
  getUser,
} from "../../manage-accounts/Accounts";
import api from "../../api/api";

const stripePromise = loadStripe(
  "pk_test_51HY0ehIEP35qL6IZ6eMWjiopC90k26DyRqxz42WMOBKiBHaSpwivQxkpvEMXjNA1Vi0N64Cc6GqSIp1juKIZoyLx00yrhXin3B"
);
class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Shown as given_name for AWS Cognito
      firstName: this.props.user_information?.first_name
        ? this.props.user_information.first_name
        : "",

      // Shown as family_name for AWS Cognito
      lastName: this.props.user_information?.last_name
        ? this.props.user_information.last_name
        : "",

      // Shown as preferred_username for AWS Cognito
      username: this.props.user_information?.user_name
        ? this.props.user_information.user_name
        : "",

      email: this.props.user_information?.email
        ? this.props.user_information.email
        : "",
      phoneNumber: this.props.user_information?.phone
        ? this.props.user_information.phone
        : "",

      password: "",
      confirmPassword: "",
      priceId: "",

      // Stage Flags
      paymentStage: false,
      registrationStage: false,
      hasSubscription: false,
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    // Setting the Price IDs based on what they chose from the practitioner register page (These keys came from Stripe->Products->PriceID)
    let priceIdKey = "";
    if (this.props?.location?.state?.subscriptionType) {
      switch (this.props.location.state.subscriptionType.toLowerCase()) {
        case "basic":
          priceIdKey = "price_1He8DgIEP35qL6IZkxZ7UM9O";
          break;

        case "business":
          priceIdKey = "price_1He8EBIEP35qL6IZdTKShkdF";
          break;

        default:
          break;
      }
      this.setState({ hasSubscription: true, priceId: priceIdKey });
    } else {
      // Error with Signing up
      swal({
        title: "Subscription Chosen Not Found!",
        text: "Please choose a subscrption.",
        icon: "error",
        buttons: [false, true],
      }).then(this.setState({ hasSubscription: false, redirect: true }));
    }
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

  // Funtion to Setup the Stripe Subscription
  setupStripeSubscription = async () => {
    this.setState({ paymentStage: true });
    swal({
      title: "Processing your Payment!",
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
    const { stripe, elements } = this.props;
    const cardElement = elements.getElement(CardElement);
    // Setting up the User's Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: `${this.state.firstName} ${this.state.lastName}`,
        email: this.state.email,
      },
    });
    if (error) {
      // Close The Payment Processing Modal
      swal.close();

      // Error with the Payment Method
      swal({
        title: "Payment Method Error!",
        text: error.message,
        icon: "error",
        buttons: [false, true],
      });
      this.setState({ paymentStage: false });
    } else {
      try {
        // Creating the User's Subscription plan with the created payment method
        const createSubscriptionResponse = await api.post(
          "/create-subscription",
          {
            user_id: this.props.user_information.user_id,
            subscription_id: this.props.location.state.subscription_id,
            paymentMethodId: paymentMethod.id,
            email: this.state.email,
            priceId: this.state.priceId,
            last_four_digits: paymentMethod.card.last4,
          }
        );
        // Close The Payment Processing Modal
        swal.close();
        console.log(createSubscriptionResponse);

        // Successfully Subscribed to the Subscription Plan
        swal({
          title: "Payment Successful!",
          text: `You are now subscribed to the ${this.props.location.state.subscriptionType} Plan. Please relogin your account.`,
          icon: "success",
          closeOnClickOutside: false,
          closeOnEsc: false,
          buttons: [false, true],
        }).then(() => {
          // If they're logged in the log them out.
          logout();
          this.props.signout();
          this.setState({ paymentStage: false, redirect: true });
        });
      } catch (error) {
        // Close The Payment Processing Modal
        swal.close();

        // Unsuccessfully Subscribed to the Subscription Plan
        swal({
          title: "Payment Unsuccessful!",
          text: error?.response?.data || "Unknown Payment Error",
          icon: "error",
          buttons: [false, true],
        });
        this.setState({ paymentStage: false });
      }
    }
  };

  // Function to Submit Register Form (Email, Password, First and Last name, Phone Number, Preferred Username)
  onSubmit = async (event) => {
    event.preventDefault();
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.username &&
      this.state.email &&
      this.state.phoneNumber
    ) {
      if (this.props.isLoggedIn) {
        this.setupStripeSubscription();
      } else {
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
          var attributePreferredUsername = new CognitoUserAttribute(
            dataUsername
          );

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
                  });
                  this.setState({ registrationStage: false });
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
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    buttons: [false, true],
                  }).then((value) => {
                    if (value === true) {
                      // Account Verification Modal
                      AccountVerificationModal(
                        getUser(userObject.email.toLowerCase())
                      );
                      this.setupStripeSubscription();
                      this.setState({
                        registrationStage: false,
                      });
                    }
                  });
                }
              }
            }
          );
        } else {
          // Close The Registration Processing Modal
          swal.close();
          swal({
            title: "Incorrect Passwords!",
            text: "Incorrect username or password.",
            icon: "error",
            buttons: [false, true],
          });
          this.setState({ registrationStage: false });
        }
      }
    } else {
      swal({
        title: "Incomplete Form!",
        text: "Please fill all the required parts of the form.",
        icon: "error",
        buttons: [false, true],
      });
    }
    this.setState({ registrationStage: false });
  };

  render() {
    const { stripe } = this.props;
    // Redirect to home if finished registering
    if (this.state.redirect) {
      if (this.state.hasSubscription) {
        return <Redirect to="/register-practitioner" />;
      } else {
        return <Redirect to="/login" />;
      }
    }
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
                    // required
                    defaultValue={this.state.firstName}
                    onChange={this.formOnChangeHandler}
                    type="text"
                    placeholder="First Name"
                    readOnly={this.props.user_information?.first_name}
                  />
                </Form.Group>
              </Col>
              {/** Last Name Form Group */}
              <Col>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name*</Form.Label>
                  <Form.Control
                    // required
                    defaultValue={this.state.lastName}
                    onChange={this.formOnChangeHandler}
                    type="text"
                    placeholder="Last Name"
                    readOnly={this.props.user_information?.last_name}
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
                    // required
                    defaultValue={this.state.email}
                    onChange={this.formOnChangeHandler}
                    type="text"
                    placeholder="Email"
                    readOnly={this.props.user_information?.email}
                  />
                </Form.Group>
              </Col>
              {/** Phone Number Form Group */}
              <Col>
                <Form.Group controlId="phoneNumber">
                  <Form.Label>Phone Number*</Form.Label>
                  <Form.Control
                    // required
                    defaultValue={this.state.phoneNumber}
                    onChange={this.formOnChangeHandler}
                    type="number"
                    placeholder="Phone"
                    readOnly={this.props.user_information?.phone}
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
                    // required
                    defaultValue={this.state.username}
                    onChange={this.formOnChangeHandler}
                    type="text"
                    placeholder="Your Username"
                    readOnly={this.props.user_information?.user_name}
                  />
                </Form.Group>
              </Col>
            </Row>
            {!this.props.isLoggedIn && (
              <div>
                <Row>
                  {/** Account Password Form Group */}
                  <Col>
                    <Form.Group controlId="password">
                      <Form.Label>Create Account Password*</Form.Label>
                      <Form.Control
                        // required
                        defaultValue={this.state.password}
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
                        // required
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
                        {`${this.props?.location?.state?.subscriptionType} plan`}
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
                        {`$${this.props?.location?.state?.price * 12} / year`}
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
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#79158f",
                          "::placeholder": {
                            color: "#5b5b5b",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                  <hr size="50" />
                  {/** Section: Pay Button */}
                  <CustomButton
                    disabled={
                      !stripe ||
                      this.state.paymentStage ||
                      this.state.registrationStage
                    }
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
    isLoggedIn: state.userReducer.isLoggedIn,
    user_information: state.userReducer.user_information,
  };
};

// Setup Redux Actions
const mapDispatchToProps = () => {
  return {
    signout,
  };
};

class MembershipForm extends React.Component {
  render() {
    return (
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <MainForm {...this.props} elements={elements} stripe={stripe} />
          )}
        </ElementsConsumer>
      </Elements>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(MembershipForm);
