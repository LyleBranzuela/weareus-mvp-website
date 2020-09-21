import "./ChooseRegister.css";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomButton from "../general-components/CustomButton";

const ChooseRegister = () => {
  return (
    <Row className="chooseRegisterStyle siteDefaultMargin">
      <Col id="userRegisterCol">
        <h2>Register as a User</h2>
        <ul>
          <li>Vel pharetra vel turpis nunc eget lorem dolor</li>
          <li>Consequat smper viverra nam libero justo laoreet sit</li>
          <li>Integer quis auctor elit sed vulputate mi sit amet mauris</li>
        </ul>
        <Link to={"/register-user"}>
          <CustomButton
            id="registerAsUserButton"
            type="submit"
            text="Register as User"
          />
        </Link>
      </Col>
      <Col id="practitionerRegisterCol">
        <h2>Register as a Practitioner</h2>
        <ul>
          <li>Vel pharetra vel turpis nunc eget lorem dolor</li>
          <li>Consequat smper viverra nam libero justo laoreet sit</li>
          <li>Integer quis auctor elit sed vulputate mi sit amet mauris</li>
        </ul>
        <Link to={"/register-practitioner"}>
          <CustomButton
            id="registerAsPractitionerButton"
            type="submit"
            text="Register as Practitioner"
          />
        </Link>
      </Col>
    </Row>
  );
};

export default ChooseRegister;
