import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { CognitoUser } from "amazon-cognito-identity-js";
import CustomButton from "../general-components/CustomButton";
import UserPool from "../../manage-accounts/UserPool";

const ForgotPasswordForm = (props) => {
  // Forget Password Functions and Variables
  const [stage, setStage] = useState(1); // 1 = Verification Code to Email Stage, 2 = Change Password Stage
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool: UserPool,
    });
  };

  // Function to Send The Code to the Verification User's Email
  const sendCode = (event) => {
    event.preventDefault();
    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log("onSuccess:", data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
      onInputVerificationCode: (data) => {
        console.log("Input Code:", data);
        setStage(2);
      },
    });
  };

  const resetPassword = (event) => {
    event.preventDefault();

    // if (password !== confirmPassword) {
    //   console.error("Password is not the same");
    //   return;
    // }

    getUser().resetPassword(code, password, {
      onSuccess: (data) => {
        console.log("onSuccess:", data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password?</Modal.Title>
      </Modal.Header>
      {/* First Stage or Sending the Verification Code Stage */}
      {stage === 1 && (
        <Form onSubmit={sendCode}>
          <Modal.Body>
            {/* Form Section for the Forgottten Account's Email */}
            <Form.Group controlId="sendVerificationCode">
              <Form.Label>
                Send a verification code to your forgotten account's email
              </Form.Label>
              <Form.Control
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {/* Form Section for Footer Buttons (Close and Send Verification Code) */}
            <CustomButton id="closeModal" text="Close" onClick={props.onHide} />
            <CustomButton
              id="sendCode"
              type="submit"
              text="Send Verification Code"
            />
          </Modal.Footer>
        </Form>
      )}
      {/* Second Stage or Resetting the Password Change */}
      {stage === 2 && (
        <Form onSubmit={resetPassword}>
          <Modal.Body>
            {/* Form Section for Checking Verification Code */}
            <Form.Group controlId="checkCode">
              <Form.Label>Verification Code</Form.Label>
              <Form.Control
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Verification Code"
              />
            </Form.Group>
            {/* Form Section for Resetting Password */}
            <Form.Group controlId="setNewPassword">
              <Form.Label>Set New Password</Form.Label>
              <Form.Control
                value={password}
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            {/* Form Section for Confirming Set New Password */}
            <Form.Group controlId="confirmNewPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                value={confirmPassword}
                type="password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm Password"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {/* Form Section for Footer Buttons (Close and Change Password) */}
            <CustomButton id="closeModal" text="Close" onClick={props.onHide} />
            <CustomButton
              id="changePasswordButton"
              type="submit"
              text="Change Password"
            />
          </Modal.Footer>
        </Form>
      )}
    </Modal>
  );
};

export default ForgotPasswordForm;
