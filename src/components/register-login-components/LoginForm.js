import "./LoginForm.css";
import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  render() {
    return (
      <Container className="loginFormStyle">
        <h2>Login</h2>
        <Form>
          <span>
            Need a We are Us account?{" "}
            <Link to="practitioner-list">
              <u>Register</u>
            </Link>
          </span>
          <Form.Group controlId="loginUsername">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control type="email" placeholder="Your Username" />
          </Form.Group>
          <Form.Group controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Your Password" />
          </Form.Group>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="rememberMeCheckBox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Link to="practitioner-list">
                <u id="forgetPassword">Forgot your password?</u>
              </Link>
            </Col>
          </Row>
          <Button
            className="primaryCustomButtonStyle"
            id="loginFormButton"
            variant="primary"
            type="submit"
          >
            Log In
          </Button>
        </Form>
      </Container>
    );
  }
}

export default LoginForm;
