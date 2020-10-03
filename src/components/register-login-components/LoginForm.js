import "./LoginForm.css";
import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "@sweetalert/with-react";
// import GoogleLogin from "react-google-login";
import {
  getUser,
  AccountVerificationModal,
  resetPasswordModal,
  // googleSignInCallBack,
  // facebookSignInCallBack,
} from "../../manage-accounts/Accounts";
import CustomButton from "../general-components/CustomButton";
import { authenticate } from "../../manage-accounts/Accounts";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // AWS Cognito Authentication Variables
      email: "",
      password: "",
      width: window.innerWidth,
      rememberAccount: false,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  // Updates States for Login Forms
  formOnChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // Function to Submit Form and Check For Authentication
  onSubmit = (event) => {
    event.preventDefault();

    authenticate(this.state.email, this.state.password)
      .then((data) => {
        // If The User wants the Device to be Remembered
        if (this.state.rememberAccount) {
          getUser(this.state.email).setDeviceStatusRemembered({
            onSuccess: function (result) {},
            onFailure: function (err) {},
          });
        } else {
          getUser(this.state.email).setDeviceStatusNotRemembered({
            onSuccess: function (result) {},
            onFailure: function (err) {},
          });
        }

        // Successful Login Modal
        swal({
          title: "Login Successful!",
          text: "Returning you to the homepage...",
          icon: "success",
          timer: 3000,
          buttons: [false, true],
          closeOnClickOutside: false,
          closeOnEsc: false,
        }).then(() => {
          window.location = "/home";
        });
      })
      .catch((err) => {
        if (err.code === "UserNotConfirmedException") {
          // Activate Account Verification Modal if not Confirmed
          AccountVerificationModal(getUser(this.state.email), false);
        } else {
          // Unsuccessful Login Modal
          swal({
            title: "Login Unsuccessful!",
            text: err.message,
            icon: "error",
            buttons: [false, true],
          });
        }
      });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;

    if (isMobile) {
      // Mobile version
      return (
        <Container className="loginFormStyleMobile">
          <h2>Login</h2>
          <Form onSubmit={this.onSubmit}>
            <span>
              Need a We are Us account?{" "}
              <Link to="practitioner-list">
                <u>Register</u>
              </Link>
            </span>
            {/** Login Username Form Section */}
            <Form.Group controlId="loginUsername">
              <Form.Label>Username or Email</Form.Label>
              <Form.Control
                value={this.state.email}
                onChange={this.formOnChangeHandler}
                type="email"
                placeholder="Your Username"
              />
            </Form.Group>
            {/** Password Form Section */}
            <Form.Group controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={this.state.password}
                onChange={this.formOnChangeHandler}
                type="password"
                placeholder="Your Password"
              />
            </Form.Group>
            {/** Remember Me and Forget Password Form Section */}
            <Row>
              <Col sm={6}>
                <Form.Group controlId="rememberMeCheckBox">
                  <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <u
                  id="forgetPasswordMobile"
                  onClick={(e) => resetPasswordModal()}
                >
                  Forgot Your Password
                </u>
              </Col>
            </Row>
            <CustomButton
              id="loginFormButtonMobile"
              type="submit"
              text="Log In"
            />
          </Form>
        </Container>
      );
    } else {
      return (
        <Container className="loginFormStyle">
          <h2>Login</h2>
          <Form onSubmit={this.onSubmit}>
            <span>
              Need a We are Us account?{" "}
              <Link to="register">
                <u>Register</u>
              </Link>
            </span>
            {/** Login Username Form Section */}
            <Form.Group controlId="email">
              <Form.Label>Username or Email</Form.Label>
              <Form.Control
                value={this.state.email}
                onChange={this.formOnChangeHandler}
                type="email"
                placeholder="Your Username"
              />
            </Form.Group>
            {/** Password Form Section */}
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={this.state.password}
                onChange={this.formOnChangeHandler}
                type="password"
                placeholder="Your Password"
              />
            </Form.Group>
            {/** Remember Me and Forget Password Form Section */}
            <Row>
              <Col sm={6}>
                <Form.Group controlId="rememberMeCheckBox">
                  <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <u id="forgetPassword" onClick={(e) => resetPasswordModal()}>
                  Forgot Your Password
                </u>
              </Col>
            </Row>
            <Row>
              <Col sm={5}>
                <CustomButton
                  id="loginFormButton"
                  type="submit"
                  text="Log In"
                  checked={this.state.rememberAccount}
                  onChange={(e) => {
                    this.setState({ rememberAccount: e.target.checked });
                  }}
                />
              </Col>
              <Col>
                {/* <div
                  className="fb-login-button"
                  data-size="large"
                  data-button-type="continue_with"
                  data-layout="default"
                  data-auto-logout-link="true"
                  data-use-continue-as="false"
                  data-width=""
                  data-onsuccess={facebookSignInCallBack}
                ></div> */}
                <a
                  className="fb-login-button"
                  href={`https://we-are-us-mvp.auth.ap-southeast-2.amazoncognito.com/oauth2/authorize?identity_provider=Facebook&redirect_uri=http://localhost:3000/home&response_type=TOKEN&client_id=1meh7rvctubo992oppdju9db6g&scope=openid`}
                >
                  TEST
                </a>
              </Col>
              <Col>
                <a
                  href={`https://we-are-us-mvp.auth.ap-southeast-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=http://localhost:3000/home&response_type=TOKEN&client_id=1meh7rvctubo992oppdju9db6g&scope=openid`}
                >
                  TEST
                </a>
              </Col>
            </Row>
          </Form>
        </Container>
      );
    }
  }
}

export default LoginForm;
