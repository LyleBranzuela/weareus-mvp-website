import "./LoginForm.css";
import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserPool from "../../manage-accounts/UserPool";
import { CognitoUser } from "amazon-cognito-identity-js";
import swal from "@sweetalert/with-react";
import CustomButton from "../general-components/CustomButton";
import { authenticate } from "../../manage-accounts/Accounts";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // AWS Cognito Authentication Variables
      email: "",
      password: "",
    };
  }

  // Updates States for Login Forms
  formOnChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // Returns a Cognitouser based on the email
  getUser = (email) => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool: UserPool,
    });
  };

  // Generates the Reset Password Form to be called over and over again
  getResetPasswordForm = (email) => {
    return swal({
      title: "Change your Password!",
      text:
        "Password has to be longer than 8 characters, numbers, has uppercase and lowercase letters.",
      content: (
        <div className="resetFormStyle">
          {/* Form Section for Checking Verification Code */}
          <Form.Group controlId="resetCode">
            <Form.Control placeholder="Verification Code" />
          </Form.Group>
          {/* Form Section for Resetting Password */}
          <Form.Group controlId="newPass">
            <Form.Control type="password" placeholder="New Password" />
          </Form.Group>
          {/* Form Section for Confirming Set New Password */}
          <Form.Group controlId="confirmPass">
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>
        </div>
      ),
      buttons: [true, "Reset Password"],
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then((data) => {
      if (data === true) {
        // Reset Password Based on the Input Fields
        let resetCode = document.getElementById("resetCode").value;
        let newPass = document.getElementById("newPass").value;
        let confirmPass = document.getElementById("confirmPass").value;
        this.resetPasswordForm(email, resetCode, newPass, confirmPass);
      }
    });
  };

  // Function for Resetting the Password
  resetPasswordForm = (email, code, newPass, confirmPass) => {
    if (newPass !== confirmPass) {
      // Both passwords are not the same
      swal({
        title: "Password and Confirm Password is not the same.",
        icon: "error",
        buttons: [false, true],
        closeOnClickOutside: false,
        closeOnEsc: false,
      }).then((data) => {
        if (data === true) {
          this.getResetPasswordForm(email);
        }
      });
    } else {
      this.getUser(email).confirmPassword(code, newPass, {
        onSuccess: (data) => {
          // Successful Reset Password Modal
          swal({
            title: "Password Successfully Resetted!",
            icon: "success",
            timer: 3000,
            buttons: [false, true],
            closeOnClickOutside: false,
            closeOnEsc: false,
          });
        },
        onFailure: (err) => {
          // Unsuccessful Reset Password Modal
          swal({
            title: "Reset Password Error!",
            text: "Something went wrong when resetting your password.",
            icon: "error",
            buttons: [false, true],
            closeOnClickOutside: false,
            closeOnEsc: false,
          }).then((data) => {
            if (data === true) {
              this.getResetPasswordForm(email);
            }
          });
        },
      });
    }
  };

  // Function to Send The Code to the Verification User's Email
  sendCode = (event) => {
    event.preventDefault();
    // Reset Password Modal
    swal({
      title: "Forgot Password?",
      text: "Send a verification code to your forgotten account's email.",
      content: (
        /* Form Section for Checking Verification Code */
        <Form.Group controlId="resetEmail">
          <Form.Control type="email" placeholder="Reset Email" />
        </Form.Group>
      ),
      icon: "info",
      buttons: [true, true],
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then((valueData) => {
      if (valueData === true) {
        // Check Whether User Exists
        let resetEmail = document.getElementById("resetEmail").value;
        if (resetEmail) {
          this.getUser(resetEmail).forgotPassword({
            onSuccess: (data) => {
              console.log("onSuccess:", data);
            },
            // Unsuccessful Forget Password Email Sent
            onFailure: (err) => {
              swal({
                title: "Email is Incorrect!",
                text: "Please input an existing email.",
                icon: "error",
                buttons: [false, true],
              });
            },
            // Successful Forget Password Email Sent
            inputVerificationCode: (data) => {
              this.getResetPasswordForm(resetEmail);
            },
          });
        } else {
          // Check if Ok is pressed and the Email Field is Empty
          swal({
            title: "Email Field is Empty!",
            text: "Please input an existing email.",
            icon: "error",
            buttons: [false, true],
          });
        }
      }
    });
  };

  // Function to Submit Form and Check For Authentication
  onSubmit = (event) => {
    event.preventDefault();
    authenticate(this.state.email, this.state.password)
      .then((data) => {
        // Successful Login Modal
        swal({
          title: "Login Successful!",
          text: "Returning you to the homepage...",
          icon: "success",
          timer: 3000,
          buttons: [false, true],
          closeOnClickOutside: false,
          closeOnEsc: false,
        }).then((value) => {
          window.location = "/home";
        });
      })
      .catch((err) => {
        // Unsuccessful Login Modal
        swal({
          title: "Login Unsuccessful!",
          text: "Incorrect username or password.",
          icon: "error",
          buttons: [false, true],
        });
      });
  };

  render() {
    return (
      <Container className="loginFormStyle">
        <h2>Login</h2>
        <div id="test"></div>
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
              <u id="forgetPassword" onClick={(e) => this.sendCode(e)}>
                Forgot Your Password
              </u>
            </Col>
          </Row>
          <CustomButton id="loginFormButton" type="submit" text="Log In" />
        </Form>
      </Container>
    );
  }
}

export default LoginForm;
