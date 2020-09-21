import "./NewPractitionerCard.css";
import React from "react";
import { Card } from "react-bootstrap";

class NewPractitionerCard extends React.Component {
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

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;

    if (isMobile) {
      // Mobile version
      return (
        <Card className="newPracCardStyleMobile">
          <Card.Img
            alt={this.props.practitionerCompany}
            variant="top"
            src={require("../../assets/images/placeholders/" +
              this.props.practitionerImage)}
          />
          <Card.ImgOverlay>
            <span id="newPracCardTypeMobile">{this.props.practitionerCardType}</span>
          </Card.ImgOverlay>
          <Card.Body>
            <Card.Title>{this.props.practitionerName}</Card.Title>
            <Card.Subtitle className="mb-4 text-muted">
              {this.props.practitionerLocation}
            </Card.Subtitle>
            <Card.Text>{this.props.practitionerDesc}</Card.Text>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card className="newPracCardStyle">
          <Card.Img
            alt={this.props.practitionerCompany}
            variant="top"
            src={require("../../assets/images/placeholders/" +
              this.props.practitionerImage)}
          />
          <Card.ImgOverlay>
            <span id="newPracCardType">{this.props.practitionerCardType}</span>
          </Card.ImgOverlay>
          <Card.Body>
            <Card.Title>{this.props.practitionerName}</Card.Title>
            <Card.Subtitle className="mb-4 text-muted">
              {this.props.practitionerLocation}
            </Card.Subtitle>
            <Card.Text>{this.props.practitionerDesc}</Card.Text>
          </Card.Body>
        </Card>
      );
    }
  }
}

export default NewPractitionerCard;
