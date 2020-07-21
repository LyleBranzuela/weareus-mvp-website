import "./Footer.css";
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Footer extends React.Component {
  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          className="footer"
          variant="light"
          className="footerStyle"
        >
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt="we are us logo"
                src={require("../../assets/icons/we_are_us_footer_symbol.svg")}
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Nav>
            {/* Register Page Link */}
            <LinkContainer to="/search">
              <Nav.Link href="/register">Register As Practicioner</Nav.Link>
            </LinkContainer>
            {/* Contact Us Page Link */}
            <LinkContainer to="/about">
              <Nav.Link>Contact Us</Nav.Link>
            </LinkContainer>
            {/* Terms and Conditions Page Link */}
            <LinkContainer to="/practitioner">
              <Nav.Link>Terms And Conditions</Nav.Link>
            </LinkContainer>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link>
              <img src={require("../../assets/icons/icon_fb.svg")}></img>
            </Nav.Link>
            <Nav.Link>
              <img src={require("../../assets/icons/icon_insta.svg")}></img>
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Footer;
