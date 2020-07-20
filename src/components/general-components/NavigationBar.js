import "./NavigationBar.css";
import React from "react";
import { Container, Row, Col, Navbar, NavDropdown, Nav } from "react-bootstrap";

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" className="navBar" fixed="top">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={require("../../assets/icons/we_are_us_logo_white.svg")}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/practitioners">For Practitioners</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link className="highlightNav" href="/register">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
