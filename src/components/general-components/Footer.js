import "./Footer.css";
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Footer extends React.Component {
  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="light"
          className="footer footerStyle siteDefaultMargin"
        >
          <LinkContainer to="/">
            {/* Footer Logo */}
            <Navbar.Brand>
              <img
                src={require("../../assets/icons/we_are_us_footer_symbol.svg")}
                className="d-inline-block align-top"
                alt="we are us logo"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Nav>
            {/* Register Page Link */}
            <LinkContainer className="navBarEffect" to="/for-practitioner">
              <Nav.Link href="/register-practitioner">
                Register As Practicioner
              </Nav.Link>
            </LinkContainer>
            {/* Contact Us Page Link */}
            <LinkContainer className="navBarEffect" to="/contact-us">
              <Nav.Link>Contact Us</Nav.Link>
            </LinkContainer>
            {/* Terms and Conditions Page Link */}
            <LinkContainer className="navBarEffect" to="/terms-and-conditions">
              <Nav.Link>Terms And Conditions</Nav.Link>
            </LinkContainer>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link>
              <img
                src={require("../../assets/icons/icon_fb.svg")}
                alt="facebook icon"
              ></img>
            </Nav.Link>
            <Nav.Link>
              <img
                src={require("../../assets/icons/icon_insta.svg")}
                alt="instagram icon"
              ></img>
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Footer;
