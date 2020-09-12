import "./LoginForm.css";
import React from "react";
import ReactDOM from "react-dom";
import { Modal, Container, Form, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomButton from "../general-components/CustomButton";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { authenticate } from "../../manage-accounts/Accounts";

class LoginForm extends React.Component {
  state = {
    // Model Functions and Variables
    forgetPassModalShow: false,
    loginModalShow: false,
    loginFailureShow: false,

    // AWS Cognito Authentication Variables
    email: "",
    password: "",
  };

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
        this.setState({ loginModalShow: true });
        
      })
      .catch((err) => {
        this.setState({ loginFailureShow: true });
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
              <u
                id="forgetPassword"
                onClick={(e) => this.setState({ forgetPassModalShow: true })}
              >
                Forgot Your Password
              </u>
            </Col>
          </Row>
          <CustomButton id="loginFormButton" type="submit" text="Log In" />
        </Form>
        {/** Forget Password Modal */}
        <ForgotPasswordForm
          show={this.state.forgetPassModalShow}
          onHide={(e) => this.setState({ forgetPassModalShow: false })}
        />
        {/** Successful Login Modal */}
        <Modal
          show={this.state.loginModalShow}
          onHide={(e) => this.setState({ loginModalShow: false })}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login Successful!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You have successfully logged in, press confirm to go back to the
            Homepage.
          </Modal.Body>
          <Modal.Footer>
            <Link to="/home">
              <CustomButton
                id="confirmLoginModal"
                type="submit"
                text="Confirm"
                onHide={(e) => this.setState({ loginModalShow: false })}
              />
            </Link>
          </Modal.Footer>
        </Modal>

        {/* <Alert
          variant="danger"
          onClose={(e) => this.setState({ loginFailureShow: false })}
          dismissible
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>Login failure.</p>
        </Alert> */}
      </Container>
    );
  }
}

export default LoginForm;
