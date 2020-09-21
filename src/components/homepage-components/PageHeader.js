import "./PageHeader.css";
import React from "react";
import { Container, Row } from "react-bootstrap";

class PageHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  scrollDown = () => {
    document.body.scrollBy({
                top: window.innerHeight - (window.innerHeight * 0.05),
                left: 0,
                behavior: 'smooth'});
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
        <div className="pageHeaderMobile">
          <Container className="pageHeaderMobile-text">
            <div>
            <h1 id="headerTitleMobile">
              Discover a refreshing  <br />
              new way to attract <br />
              more clients.
              </h1>
            </div>
            <div>
            <p id="headerDescMobile">
              We Are Us. An exciting new platform  <br />
              to grow your health, wellness and <br />
              self-improvement business.  <br />
              {this.props.learnMoreButton}     
            </p>
            <img
            src={require("../../assets/icons/menu_arrow_white.svg")}
            alt="practitioners-header"
            id="scrollDownButton"
            onClick={this.scrollDown}
            />
            </div>
          </Container>
        </div>

      );
    } else {
      return (
        <div className="pageHeader">
        <img
        src={require("../../assets/images/for_practitioners_header.jpg")}
        alt="practitioners-header"
        />
        <Container className="pageHeader-text">
        <Row>
        <h1 id="headerTitle">
        Discover a refreshing new <br />
        way to attract more clients.
        </h1>
        </Row>
        <Row>
        <p id="headerDesc">
        We Are Us. An exciting new platform to grow your <br />
        health, wellness and self-improvement business.
        </p>
        </Row>
        <Row>
        {this.props.learnMoreButton}
        </Row>
        </Container>
        </div>
      );
    }
  }
}

export default PageHeader;
