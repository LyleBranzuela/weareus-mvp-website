import "./NavigationBar.css";
import React from "react";
import { logout } from "../../manage-accounts/Accounts";
import { connect } from "react-redux";
import { signout } from "../../actions";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

class NavigationBar2 extends React.Component {
  constructor() {
    super();
    this.state = {
      scrolled: false,
      userLoggedIn: false, // By Default The user is not logged in
      width: window.innerWidth,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    window.addEventListener("scroll", this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
    window.removeEventListener("scroll", this.handleScroll, true);
  }

  handleScroll(event) {
    const scroll_pos = document.body.scrollTop;
    if (scroll_pos > 0) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;
    if (isMobile) {
      // Mobile version
      return (
        <Navbar
          collapseOnSelect
          fixed="top"
          variant="dark"
          expand="lg"
          className="navBarMobile2"
          style={{
            backgroundColor: this.state.scrolled ? "#79158f" : "transparent",
          }}
        >
          {/*fixed="top"*/}
          <LinkContainer to="/home">
            <Navbar.Brand>
              <img
                alt="we are us logo"
                src={require("../../assets/icons/we_are_us_logo_white.svg")}
                className="d-inline-block align-top"
                id="mobile_logo"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle image="" aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbarMobile2-nav"
          >
            <Nav className="navBarMobile-links">
              {/* Search Page Link */}
              <LinkContainer to="/search">
                <Nav.Link className="navBar2Effect" href="/search">
                  Search
                </Nav.Link>
              </LinkContainer>
              {/* About Page Link */}
              <LinkContainer className="navBar2Effect" to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              {/* Practitioner Page Link */}
              <LinkContainer className="navBar2Effect" to="/for-practitioner">
                <Nav.Link>For Practitioners</Nav.Link>
              </LinkContainer>
              {/* Conditional Rendering if a user is logged in*/}
              {this.props.isLoggedIn ? (
                <>
                  {/* Logout Page Link */}
                  <LinkContainer
                    className="navBar2Effect"
                    to="/home"
                    onClick={() => {
                      logout();
                      this.props.signout();
                    }}
                  >
                    <Nav.Link>Logout</Nav.Link>
                  </LinkContainer>
                  {/* Conditional Rendering if the user is practitioner or not */}
                  {this.props.user_information.user_type === "practitioner" ? (
                    /* Link to their Profile */
                    <LinkContainer
                      to={`/practitioner-profile/${this.props.user_information.company_id}`}
                      className="highlightNavMobile2"
                    >
                      <Nav.Link>My Profile</Nav.Link>
                    </LinkContainer>
                  ) : (
                    /* User Join Us Page Link */
                    <LinkContainer
                      to="/register-practitioner"
                      className="highlightNavMobile2"
                    >
                      <Nav.Link>Join Us!</Nav.Link>
                    </LinkContainer>
                  )}
                </>
              ) : (
                <>
                  {/* Logout Page Link */}
                  <LinkContainer className="navBar2Effect" to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  {/* Register Page Link */}
                  <LinkContainer to="/register" className="highlightNavMobile2">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      // Desktop version
      return (
        <Navbar
          collapseOnSelect
          fixed="top"
          expand="lg"
          className="navBar2"
          style={{
            backgroundColor: this.state.scrolled ? "#79158f" : "transparent",
          }}
        >
          <LinkContainer to="/home">
            <Navbar.Brand>
              <img
                alt="we are us logo"
                src={require("../../assets/icons/we_are_us_logo_white.svg")}
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav className="navBar2-links">
              {/* Search Page Link */}
              <LinkContainer to="/search">
                <Nav.Link className="navBar2Effect" href="/search">
                  Search
                </Nav.Link>
              </LinkContainer>
              {/* About Page Link */}
              <LinkContainer className="navBar2Effect" to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              {/* Practitioner Page Link */}
              <LinkContainer className="navBar2Effect" to="/for-practitioner">
                <Nav.Link>For Practitioners</Nav.Link>
              </LinkContainer>
              {/* Conditional Rendering if a user is logged in*/}
              {this.props.isLoggedIn ? (
                <>
                  {/* Logout Page Link */}
                  <LinkContainer
                    className="navBar2Effect"
                    to="/home"
                    onClick={() => {
                      logout();
                      this.props.signout();
                    }}
                  >
                    <Nav.Link>Logout</Nav.Link>
                  </LinkContainer>
                  {/* Conditional Rendering if the user is practitioner or not */}
                  {this.props.user_information.user_type === "practitioner" ? (
                    /* Link to their Profile */
                    <LinkContainer
                      to={`/practitioner-profile/${this.props.user_information.company_id}`}
                      className="highlightNav2"
                    >
                      <Nav.Link>My Profile</Nav.Link>
                    </LinkContainer>
                  ) : (
                    /* User Join Us Page Link */
                    <LinkContainer
                      to="/register-practitioner"
                      className="highlightNav2"
                    >
                      <Nav.Link>Join Us!</Nav.Link>
                    </LinkContainer>
                  )}
                </>
              ) : (
                <>
                  {/* Logout Page Link */}
                  <LinkContainer className="navBar2Effect" to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  {/* Register Page Link */}
                  <LinkContainer to="/register" className="highlightNav2">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    user_information: state.userReducer.user_information,
  };
};

const mapDispatchToProps = () => {
  return {
    signout,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps())(NavigationBar2)
);
