import "./NavigationBar.css";
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect fixed="top" expand="lg" className="navBar">
        {/*fixed="top"*/}
        <LinkContainer to="/home">
          <Navbar.Brand>
            <img
              alt="we are us logo"
              src={require("../../assets/icons/we_are_us_logo.svg")}
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav className="navBar-links">
            {/* Search Page Link */}
            <LinkContainer to="/search">
              <Nav.Link className="navBarEffect" href="/search">
                Search
              </Nav.Link>
            </LinkContainer>
            {/* About Page Link */}
            <LinkContainer className="navBarEffect" to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            {/* Practitioner Page Link */}
            <LinkContainer className="navBarEffect" to="/for-practitioner">
              <Nav.Link>For Practitioners</Nav.Link>
            </LinkContainer>
            {/* Login Page Link */}
            <LinkContainer className="navBarEffect" to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            {/* Register Page Link */}
            <LinkContainer to="/register" className="highlightNav">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
