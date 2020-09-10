import "./LoginForm.css";
import React, { useState, useContext } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomButton from "../general-components/CustomButton";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { AccountContext } from "../../manage-accounts/Accounts";

const LoginForm = () => {
  // Model Functions and Variables
  const [modalShow, setModalShow] = useState(false);

  // AWS Cognito Authentication Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate } = useContext(AccountContext);

  // Function to Submit Form and Check For Authentication
  const onSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        console.log("Logged in!", data);
      })
      .catch((err) => {
        console.error("Failed to log in!", err);
      });
  };

  return (
    <Container className="loginFormStyle">
      <h2>Login</h2>
      <Form onSubmit={onSubmit}>
        <span>
          Need a We are Us account?{" "}
          <Link to="register">
            <u>Register</u>
          </Link>
        </span>
        {/** Login Username Form Section */}
        <Form.Group controlId="loginUsername">
          <Form.Label>Username or Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Your Username"
          />
        </Form.Group>
        {/** Password Form Section */}
        <Form.Group controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
            <u id="forgetPassword" onClick={() => setModalShow(true)}>
              Forgot Your Password
            </u>
          </Col>
        </Row>
        <CustomButton id="loginFormButton" type="submit" text="Log In" />
      </Form>
      <ForgotPasswordForm show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
};

export default LoginForm;
