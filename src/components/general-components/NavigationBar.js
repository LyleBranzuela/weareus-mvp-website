import "./NavigationBar.css";
import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../../manage-accounts/Accounts";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavigationBar = () => {
  // By Default The user is not logged in
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { getSession, logout } = useContext(AccountContext);

  // Check If User Has Logged in
  useEffect(() => {
    getSession()
      .then((session) => {
        console.log("Session", session);
        setUserLoggedIn(true);
      })
      .catch((err) => {
        setUserLoggedIn(false);
      });
  });

  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" className="navBar">
      {/*fixed="top"*/}
      {/* Navigation Bar Logo */}
      <LinkContainer to="/home">
        <Navbar.Brand>
          <img
            alt="we are us logo"
            src={require("../../assets/icons/we_are_us_logo.svg")}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </LinkContainer>
      {/* Navigation Bar Links Section */}
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
          {userLoggedIn ? (
            /* Logout Page Link */
            <LinkContainer
              className="navBarEffect"
              to="/home"
              onClick={() => {
                logout();
                setUserLoggedIn(false);
              }}
            >
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
          ) : (
            /* Login Page Link */
            <LinkContainer className="navBarEffect" to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          )}
          {/* Register Page Link */}
          <LinkContainer className="highlightNav" to="/register">
            <Nav.Link>Register</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
