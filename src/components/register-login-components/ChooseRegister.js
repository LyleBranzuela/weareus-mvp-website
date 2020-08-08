import "./ChooseRegister.css";
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class ChooseRegister extends React.Component {
  render() {
    return (
      <Row className="chooseRegisterStyle siteDefaultMargin">
        <Col id="userRegisterCol">
          <h2>Register as a User</h2>
          <span>
            <img
              src={require("../../assets/icons/check_circle.svg")}
              alt="check-user-register-1"
            />
            Vel pharetra vel turpis nunc eget lorem dolor
          </span>
          <br />
          <span>
            <img
              src={require("../../assets/icons/check_circle.svg")}
              alt="check-user-register-2"
            />
            Consequat smper viverra nam libero justo laoreet sit
          </span>
          <br />
          <span>
            <img
              src={require("../../assets/icons/check_circle.svg")}
              alt="check-user-register-3"
            />
            Integer quis auctor elit sed vulputate mi sit amet mauris
          </span>
          <Link to="register-user">
            <Button
              className="primaryCustomButtonStyle"
              id="registerAsUserButton"
              variant="primary"
              type="submit"
            >
              Register as User
            </Button>
          </Link>
        </Col>
        <Col id="practitionerRegisterCol">
          <h2>Register as a Practitioner</h2>
          <span>
            <img
              src={require("../../assets/icons/check_circle.svg")}
              alt="check-practitioner-register-1"
            />
            Vel pharetra vel turpis nunc eget lorem dolor
          </span>
          <br />
          <span>
            <img
              src={require("../../assets/icons/check_circle.svg")}
              alt="check-practitioner-register-2"
            />
            Consequat smper viverra nam libero justo laoreet sit
          </span>
          <br />
          <span>
            <img
              src={require("../../assets/icons/check_circle.svg")}
              alt="check-practitioner-register-3"
            />
            Integer quis auctor elit sed vulputate mi sit amet mauris
          </span>
          <Link to="register-practitioner">
            <Button
              className="primaryCustomButtonStyle"
              id="registerAsPractitionerButton"
              variant="primary"
              type="submit"
            >
              Register as Practitioner
            </Button>
          </Link>
        </Col>
      </Row>
    );
  }
}

export default ChooseRegister;
