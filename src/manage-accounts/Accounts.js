import React from "react";
import UserPool from "./UserPool";
import swal from "@sweetalert/with-react";
import { Form } from "react-bootstrap";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import AWS from "aws-sdk";

// ONLY FOR THE MVP, CHANGE THIS IN PRODUCTION - IAM User
const cognitoDetails = {
  accessKeyId: "AKIA2DSPNNEE7DJEOGKI",
  secretAccessKey: "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",
  region: "ap-southeast-2",
};

// ONLY FOR THE MVP, CHANGE THIS IN PRODUCTION - Identity Pool
const identityCognitoDetails = {
  IdentityPoolId: "ap-southeast-2:c303a19f-ef59-49a5-8d05-b2c74783fe77",
  region: "ap-southeast-2",
};

// Function to Get the Current Session's Information (Logged in or not)
const getSession = async () => {
  await new Promise((resolve, reject) => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          reject();
        } else {
          resolve(session);
        }
      });
    } else {
      reject();
    }
  });
};

// Returns a Cognitouser based on the email
function getUser(email) {
  return new CognitoUser({
    Username: email.toLowerCase(),
    Pool: UserPool,
  });
}

// Function to logout the User
const logout = () => {
  const user = UserPool.getCurrentUser();
  if (user) {
    user.signOut();
  }
};

// Function to Authenticate Users in AWS Cognito
const authenticate = (Username, Password) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username, Pool: UserPool });
    const authDetails = new AuthenticationDetails({ Username, Password });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        // let accessToken = data.getAccessToken().getJwtToken();

        //POTENTIAL: Region needs to be set if not already set previously elsewhere.
        AWS.config.region = identityCognitoDetails.region;

        let loginObject = {};
        // Change the key below according to the specific region your user pool is in.
        loginObject[
          `cognito-idp.ap-southeast-2.amazonaws.com/${UserPool.getUserPoolId()}`
        ] = data.getIdToken().getJwtToken();

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: identityCognitoDetails.IdentityPoolId, // your identity pool id here,
          Logins: loginObject,
        });

        //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
        AWS.config.credentials.clearCachedId();
        AWS.config.credentials.refresh((error) => {
          if (error) {
            console.error(error);
          } else {
            resolve(data);
          }
        });
      },
      onFailure: (err) => {
        // Problems in Authentication
        swal.close();
        swal({
          title: "Authentication Error!",
          text: err.message,
          icon: "error",
          buttons: [false, true],
        });
        reject(err);
      },
      newPasswordRequired: (data) => {
        swal.close();
        swal({
          title: "New Password Required!",
          icon: "error",
          buttons: [false, true],
        }).then(() => {
          resetPasswordModal();
        });
        resolve(data);
      },
    });
  });
};

// Shows the Reset Password Modal
const resetPasswordModal = () => {
  // Generates the Reset Password Form to be called over and over again
  function getResetPasswordForm(email, resetCode) {
    return swal({
      title: "Change your Password!",
      text:
        "Password has to be longer than 8 characters, numbers, has uppercase and lowercase letters.",
      content: (
        <div className="resetFormStyle">
          {/* Form Section for Checking Verification Code */}
          <Form.Group controlId="resetCode">
            <Form.Control
              placeholder="Verification Code"
              defaultValue={resetCode ? resetCode : ""}
            />
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
        resetPasswordForm(email, resetCode, newPass, confirmPass);
      }
    });
  }

  // Function for Resetting the Password
  function resetPasswordForm(email, code, newPass, confirmPass) {
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
          getResetPasswordForm(email, code);
        }
      });
    } else {
      getUser(email).confirmPassword(code, newPass, {
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
              getResetPasswordForm(email, code);
            }
          });
        },
      });
    }
  }

  // Function to Send The Code to the Verification User's Email
  function sendCode() {
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
          getUser(resetEmail).forgotPassword({
            onSuccess: (data) => {},
            // Unsuccessful Forget Password Email Sent
            onFailure: (err) => {
              swal({
                title: "Email is Incorrect!",
                text: err.message,
                icon: "error",
                buttons: [false, true],
              });
            },
            // Successful Forget Password Email Sent
            inputVerificationCode: (data) => {
              getResetPasswordForm(resetEmail);
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
  }

  return sendCode();
};

// Asks for a Cognito User and Render the Modal
const AccountVerificationModal = (currentUser) => {
  function renderModal(user) {
    return swal({
      title: "Account Verification",
      text:
        "A verification code should be sent to your email. If not, press the resend button below.",
      content: (
        /* Form Section for Checking Verification Code */
        <Form.Group controlId="confirmAccountCode">
          <Form.Control type="text" placeholder="Verification Code" />
        </Form.Group>
      ),
      icon: "info",
      buttons: {
        cancel: "Cancel",
        resendCode: "Resend Code",
        verify: "Verify",
      },
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then((valueData) => {
      switch (valueData) {
        // When Resend Code Button is Pressed - Resend the Verification Code to the Email
        case "resendCode":
          user.resendConfirmationCode(function (err, result) {
            if (err) {
              // Verification Unsuccessfully Sent to the Email
              swal({
                title: "Verification Code Error",
                text: "Error resending the Verification Code.",
                icon: "error",
                buttons: [false, true],
              }).then((data) => {
                if (data === true) {
                  renderModal(user);
                }
              });
            } else {
              // Verification Successfully Sent to the Email
              swal({
                title: "Verification Code Sent!",
                text:
                  "Please check your registered email for the verification code.",
                icon: "success",
                buttons: [false, true],
              }).then((data) => {
                if (data === true) {
                  renderModal(user);
                }
              });
            }
          });
          break;

        // When Verify Button is Pressed - Verify the Code in the Form
        case "verify":
          // Check Whether User Exists
          let verificationCode = document.getElementById("confirmAccountCode")
            .value;
          if (verificationCode) {
            user.confirmRegistration(verificationCode, true, function (
              err,
              result
            ) {
              if (err) {
                // Account Verification Error
                swal({
                  title: "Error in Verification",
                  text: err.message,
                  icon: "error",
                  buttons: [false, true],
                }).then((data) => {
                  if (data === true) {
                    renderModal(user);
                  }
                });
              } else {
                // Account Successfully Verified
                swal({
                  title: "Account Verified Successfully!",
                  text: "Account is now verified, and can be logged in.",
                  icon: "success",
                  buttons: [false, true],
                });
              }
            });
          } else {
            // Check if Ok is pressed and the Verifiction Code Field is Empty
            swal({
              title: "No Verification Code Inputted!",
              text: "Please input the verification code.",
              icon: "error",
              buttons: [false, true],
            }).then((data) => {
              if (data === true) {
                renderModal(user);
              }
            });
          }
          break;

        // Exit the Modal
        default:
          break;
      }
    });
  }

  return renderModal(currentUser);
};

export {
  cognitoDetails,
  identityCognitoDetails,
  getSession,
  getUser,
  authenticate,
  logout,
  resetPasswordModal,
  AccountVerificationModal,
};
