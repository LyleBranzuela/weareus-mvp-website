import "./LoginForm.css";
import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import swal from "@sweetalert/with-react";
import { connect } from "react-redux";
import { signin } from "../../actions";
// import GoogleLogin from "react-google-login";
import {
  getUser,
  AccountVerificationModal,
  resetPasswordModal,
  // googleSignInCallBack,
  // facebookSignInCallBack,
} from "../../manage-accounts/Accounts";
import UserPool from "../../manage-accounts/UserPool";
import CustomButton from "../general-components/CustomButton";
import { authenticate } from "../../manage-accounts/Accounts";
import api from "../../api/api";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // AWS Cognito Authentication Variables
      email: "",
      password: "",
      width: window.innerWidth,
      redirect: false,
      rememberAccount: false,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    this.setState({ redirect: false });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  // Function to Get a Specific User by reference_id
  getUserByRef = async (referenceId) => {
    let userObj = {
      user_id: "",
      user_type: "",
      email: "",
      first_name: "",
      last_name: "",
      user_name: "",
      phone: "",
    };
    const userResponse = await api.get("/user/?reference_id=" + referenceId);
    // Fill up relevant info and Create the Retrieved User from the Response
    userObj.user_id = userResponse.data.rows[0].user_id;
    userObj.user_type = userResponse.data.rows[0].user_type;
    userObj.email = userResponse.data.rows[0].email;
    userObj.first_name = userResponse.data.rows[0].first_name;
    userObj.last_name = userResponse.data.rows[0].last_name;
    userObj.user_name = userResponse.data.rows[0].user_name;
    userObj.phone = userResponse.data.rows[0].phone;

    if (userObj.user_type === "practitioner") {
      const specialistResponse = await api.get(
        `/specialist-profile/${userObj.user_id}`
      );
      if (
        specialistResponse.data.company_id &&
        specialistResponse.data.subscription_id
      ) {
        userObj.company_id = specialistResponse.data.company_id;
        userObj.subscription_id = specialistResponse.data.subscription_id;
      }
    }
    return userObj;
  };

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
      .then((data, err) => {
        console.log(err);
        console.log(data);
        console.log(this.state.rememberAccount);
        console.log(UserPool.getCurrentUser());
        // If The User wants the Device to be Remembered
        // if (this.state.rememberAccount) {
        //   UserPool.getCurrentUser().setDeviceStatusRemembered({
        //     onSuccess: function (result) {
        //       console.log(result);
        //     },
        //     onFailure: function (err) {
        //       console.log(err);
        //     },
        //   });
        // } else {
        //   UserPool.getCurrentUser().setDeviceStatusNotRemembered({
        //     onSuccess: function (result) {
        //       console.log(result);
        //     },
        //     onFailure: function (err) {
        //       console.log(err);
        //     },
        //   });
        // }
        // // Successful Login Modal
        swal({
          title: "Login Successful!",
          text: "Returning you to the homepage...",
          icon: "success",
          timer: 3000,
          buttons: [false, true],
          closeOnClickOutside: false,
          closeOnEsc: false,
        }).then(async () => {
          this.setState({ redirect: true });
          const reference_id = data.accessToken.payload.sub;
          this.props.signin(
            reference_id,
            await this.getUserByRef(reference_id)
          );
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

    // Redirect to home if logged in
    if (this.state.redirect || this.props.isLoggedIn) {
      return <Redirect to="home" />;
    }

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
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={this.state.email}
                onChange={this.formOnChangeHandler}
                type="email"
                placeholder="Your Email"
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
                  <Form.Check
                    type="checkbox"
                    label="Remember Me"
                    checked={this.state.rememberAccount}
                    onChange={(e) => {
                      this.setState({ rememberAccount: e.target.checked });
                    }}
                  />
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

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

const mapDispatchToProps = () => {
  return {
    signin,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(LoginForm);
