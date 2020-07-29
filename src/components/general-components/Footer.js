import "./Footer.css";
import React from "react";
import { Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Footer extends React.Component {
  render() {
    return (
      <div className="footerStyle">
        <Navbar collapseOnSelectclassName="navBar">
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt="we are us logo"
                src={require("../../assets/icons/we_are_us_footer_symbol.svg")}
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </LinkContainer>
        </Navbar>
      </div>
    );
  }
}

export default Footer;
