import "./PageHeader.css";
import React from "react";
import { Container, Row } from "react-bootstrap";

class PageHeader extends React.Component {
  render() {
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

export default PageHeader;
