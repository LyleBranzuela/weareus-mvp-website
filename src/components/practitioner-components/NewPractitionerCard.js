import "./NewPractitionerCard.css";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class NewPractitionerCard extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;

    // Map all of the Services
    let servicesList;
    if (this.props.services) {
      servicesList = this.props.services;
      servicesList = Object.keys(servicesList)
        .map(function (service) {
          return servicesList[service].service_name;
        })
        .join(", ");
    }

    if (isMobile) {
      // Mobile version
      return (
        /** Component that generates a New Practitioner Card */
        <Card className="newPracCardStyleMobile">
          <Card.Img
            alt={this.props.company_name}
            variant="top"
            src={require("../../assets/images/placeholders/" +
              this.props.cover_image)}
          />
          <Card.ImgOverlay>
            <span id="newPracCardTypeMobile">{servicesList}</span>
          </Card.ImgOverlay>
          <Card.Body>
            <Link to={`/practitioner-profile/${this.props.company_id}`}>
              <Card.Title>{this.props.company_name}</Card.Title>
            </Link>
            <Card.Subtitle className="mb-4 text-muted">
              {this.props.address}
            </Card.Subtitle>
            <Card.Text>{this.props.about.slice(0, 200)}</Card.Text>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        /** Component that generates a New Practitioner Card */
        <Card className="newPracCardStyle">
          <Card.Img
            alt={this.props.company_name}
            variant="top"
            src={require("../../assets/images/placeholders/" +
              this.props.cover_image)}
          />
          <Card.ImgOverlay>
            <span id="newPracCardType">{servicesList}</span>
          </Card.ImgOverlay>
          <Card.Body>
            <Link to={`/practitioner-profile/${this.props.company_id}`}>
              <Card.Title>{this.props.company_name}</Card.Title>
            </Link>
            <Card.Subtitle className="mb-4 text-muted">
              {this.props.address}
            </Card.Subtitle>
            <Card.Text>{this.props.about.slice(0, 200)}</Card.Text>
          </Card.Body>
        </Card>
      );
    }
  }
}

export default NewPractitionerCard;
