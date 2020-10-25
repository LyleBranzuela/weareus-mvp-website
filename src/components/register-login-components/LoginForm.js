import "./LoginForm.css";
import React from "react";
import { Container, Form, Row, Col, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import swal from "@sweetalert/with-react";
import { connect } from "react-redux";
import AWS from "aws-sdk";
import GoogleLogin from "react-google-login";
// import FacebookLogin from "react-facebook-login";
import {
  getUser,
  AccountVerificationModal,
  resetPasswordModal,
} from "../../manage-accounts/Accounts";
import CustomButton from "../general-components/CustomButton";
import { authenticate } from "../../manage-accounts/Accounts";
import { signin } from "../../actions";
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
      loginFlag: false,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    this.setState({ redirect: false });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  // Function to Get a Specific User by Email
  getUserByEmail = async (email) => {
    let userObj = {
      user_id: "",
      user_type: "",
      email: "",
      first_name: "",
      last_name: "",
      user_name: "",
      phone: "",
    };

    const userResponse = await api.get("/user/?email=" + email);
    if (userResponse.data.rows.length > 0) {
      // Fill up relevant info and Create the Retrieved User from the Response
      userObj.user_id = userResponse.data.rows[0].user_id;
      userObj.user_type = userResponse.data.rows[0].user_type;
      userObj.email = userResponse.data.rows[0].email;
      userObj.first_name = userResponse.data.rows[0].first_name;
      userObj.last_name = userResponse.data.rows[0].last_name;
      userObj.user_name = userResponse.data.rows[0].user_name;
      userObj.phone = userResponse.data.rows[0].phone;
      userObj.hasActiveSubscription = userResponse.data.rows[0].payment_id
        ? true
        : false;
      if (userObj.hasActiveSubscription) {
        // This ID will determine what Subscription They're In (Business/Basic)
        userObj.subscription_id = userResponse.data.rows[0].subscription_id;
        userObj.company_id = userResponse.data.rows[0].company_id;
      }
      return userObj;
    } else {
      return null;
    }
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

  // Google Sign-in button's callback when pressed
  googleSignInCallBack = (authResult) => {
    if (!authResult.error) {
      // Add the Google access token to the Amazon Cognito credentials login map.
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "ap-southeast-2:c303a19f-ef59-49a5-8d05-b2c74783fe77",
        Logins: {
          "accounts.google.com": authResult.tokenId,
        },
      });

      // Obtain AWS credentials
      AWS.config.credentials.get(() => {
        swal({
          title: "Login Successful!",
          text: "Returning you to the homepage...",
          icon: "success",
          timer: 3000,
          buttons: [false, true],
          closeOnClickOutside: false,
          closeOnEsc: false,
        }).then(async () => {
          const reference_id = authResult.googleId;
          // See if the User's Email already Exists within the Database
          let userObj = await this.getUserByEmail(authResult.profileObj.email);
          if (userObj) {
            // Sign in Normally
            this.props.signin(reference_id, userObj);
            this.setState({ redirect: true });
          } else {
            // Create The Account
            try {
              userObj = {
                first_name: authResult.profileObj.givenName || " ",
                last_name: authResult.profileObj.familyName || " ",
                user_name: authResult.profileObj.name || " ",
                email: authResult.profileObj.email,
                phone: " ",
                user_type: "user",
                reference_id: reference_id,
              };
              const registerResponse = await api.post("/user", userObj);
              this.props.signin(reference_id, registerResponse);
              this.setState({ redirect: true });
            } catch (err) {
              console.log(err);
            }
          }
        });
      });
    }
  };

  // Facebook Sign-in button's callback when pressed ( NEEDS )
  // facebookSignInCallBack = () => {
  //   const FB = window.FB;
  //   FB.login(function (response) {
  //     // Check if the user logged in successfully.
  //     if (response.authResponse) {
  //       // Add the Facebook access token to the Amazon Cognito credentials login map.
  //       AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //         IdentityPoolId: "ap-southeast-2:c303a19f-ef59-49a5-8d05-b2c74783fe77",
  //         Logins: {
  //           "graph.facebook.com": response.authResponse.idToken,
  //         },
  //       });

  //       // Obtain AWS credentials
  //       AWS.config.credentials.get(() => {
  //         // swal({
  //         //   title: "Login Successful!",
  //         //   text: "Returning you to the homepage...",
  //         //   icon: "success",
  //         //   timer: 3000,
  //         //   buttons: [false, true],
  //         //   closeOnClickOutside: false,
  //         //   closeOnEsc: false,
  //         // }).then(async () => {
  //         //   this.setState({ redirect: true });
  //         //   const reference_id = data.accessToken.payload.sub;
  //         //   this.props.signin(
  //         //     reference_id,
  //         //     await this.getUserByEmail(data.idToken.payload.email)
  //         //   );
  //         // });
  //       });
  //     } else {
  //       console.log("There was a problem logging you in.");
  //     }
  //   });
  // };

  // Function to Submit Form and Check For Authentication
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ loginFlag: true });
    swal({
      title: "Logging In!",
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
    authenticate(this.state.email, this.state.password)
      .then((data) => {
        // If The User wants the Device to be Remembered
        // if (this.state.rememberAccount) {
        //   getUser(this.state.email).setDeviceStatusRemembered({
        //     onSuccess: function (result) {},
        //     onFailure: function (err) {},
        //   });
        // } else {
        //   getUser(this.state.email).setDeviceStatusNotRemembered({
        //     onSuccess: function (result) {},
        //     onFailure: function (err) {},
        //   });
        // }
        // Close The Login Processing Modal
        swal.close();

        // Successful Login Modal
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
            await this.getUserByEmail(data.idToken.payload.email)
          );
        });
        this.setState({ loginFlag: false });
      })
      .catch((err) => {
        if (err.code === "UserNotConfirmedException") {
          // Close The Login Processing Modal
          swal.close();

          // Activate Account Verification Modal if not Confirmed
          AccountVerificationModal(getUser(this.state.email), false);
          this.setState({ loginFlag: false });
        } else {
          // Close The Login Processing Modal
          swal.close();

          // Unsuccessful Login Modal
          swal({
            title: "Login Unsuccessful!",
            text: err.message,
            icon: "error",
            buttons: [false, true],
          });
          this.setState({ loginFlag: false });
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
            {/** Login Email Form Section */}
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
              <Form.Label>Email</Form.Label>
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
                  disabled={this.state.loginFlag}
                  id="loginFormButton"
                  type="submit"
                  text="Log In"
                  checked={this.state.rememberAccount}
                  onChange={(e) => {
                    this.setState({ rememberAccount: e.target.checked });
                  }}
                />
              </Col>
              {/* 
              <Col>
                <a
                  className="fb-login-button"
                  href={`https://we-are-us-mvp.auth.ap-southeast-2.amazoncognito.com/oauth2/authorize?identity_provider=Facebook&redirect_uri=http://localhost:3000/home&response_type=TOKEN&client_id=1meh7rvctubo992oppdju9db6g&scope=openid`}
                >
                  Login With Facebook
                </a>
              </Col>
              */}
              {/* 
              <Col>
                <FacebookLogin
                  appId="311556100263228"
                  autoLoad={false}
                  fields="name,email,picture"
                  // onClick={componentClicked}
                  callback={this.facebookSignInCallBack}
                />
              </Col> 
              */}
              <Col>
                <GoogleLogin
                  className="googleLogin"
                  clientId="423149440415-l1v06tlarr297mkbv1oh5g2jv0pgdrv3.apps.googleusercontent.com"
                  onSuccess={this.googleSignInCallBack}
                  cookiePolicy={"single_host_origin"}
                />
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
