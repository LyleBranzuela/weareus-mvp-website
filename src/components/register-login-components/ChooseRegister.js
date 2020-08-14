import "./ChooseRegister.css";
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

const ChooseRegister = () => {
  let { url } = useRouteMatch();
  return (
    <Row className="chooseRegisterStyle siteDefaultMargin">
      {/** Register as User Section */}
      <Col id="userRegisterCol">
        <h2>Register as a User</h2>
        <ul>
          <li>Vel pharetra vel turpis nunc eget lorem dolor</li>
          <li>Consequat smper viverra nam libero justo laoreet sit</li>
          <li>Integer quis auctor elit sed vulputate mi sit amet mauris</li>
        </ul>
        <Link to={`${url}/register-user`}>
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
      {/** Register as Practitioner Section */}
      <Col id="practitionerRegisterCol">
        <h2>Register as a Practitioner</h2>
        <ul>
          <li>Vel pharetra vel turpis nunc eget lorem dolor</li>
          <li>Consequat smper viverra nam libero justo laoreet sit</li>
          <li>Integer quis auctor elit sed vulputate mi sit amet mauris</li>
        </ul>
        <Link to={`${url}/register-practitioner`}>
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
};

export default ChooseRegister;
