import "./MessageOfTheDay.css";
import React from "react";
import { Container } from "react-bootstrap";

class MessageOfTheDay extends React.Component {
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
        <Container fluid>
          <p className="motdStyleMobile">
            {this.props.motd}
            </p>
        </Container>
      );
    } else {
      return (
        <p className="motdStyle">
          {this.props.motd}
        </p>
      );
    }
  }
}

export default MessageOfTheDay;
