import "./TermsAndConditions.css";
import React from "react";

class TermsAndConditions extends React.Component {
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
        <div className="tacPageMobile">
          <p className="tacHeaderMobile"> <strong> Terms & Conditions </strong> </p>
          <p className="tacTextMobile"> <strong> Heading Goes Here </strong> <br /> Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit, sed do eiusmod tempor incididunt
                          ut labore et dolore magna aliqua. Nulla facilisi etiam dignissim diam.
                          Turpis nunc eget lorem dolor sed viverra ipsum. Cursus risus at ultrices mi tempus.
                          Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. </p>

          <p className="tacTextMobile"> <strong> Heading Goes Here </strong> <br /> Turpis in eu mi bibendum. Fringilla urna porttitor rhoncus dolor purus.
                          Sed blandit libero volutpat sed cras ornare arcu dui vivamus.
                          Quam lacus suspendisse faucibus interdum. Diam donec
                          adipiscing tristique risus nec feugiat in fermentum posuere. Lectus quam id leo in vitae
                          turpis massa. Id venenatis a condimentum vitae sapien pellentesque. </p>

          <p className="tacTextMobile"> <strong> Heading Goes Here </strong> <br /> Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit, sed do eiusmod tempor incididunt
                          ut labore et dolore magna aliqua. Nulla facilisi etiam dignissim diam.
                          Turpis nunc eget lorem dolor sed viverra ipsum. Cursus risus at ultrices mi tempus.
                          Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. </p>

          <p className="tacTextMobile"> <strong> Heading Goes Here </strong> <br /> Turpis in eu mi bibendum. Fringilla urna porttitor rhoncus dolor purus.
                          Sed blandit libero volutpat sed cras ornare arcu dui vivamus.
                          Quam lacus suspendisse faucibus interdum. Diam donec
                          adipiscing tristique risus nec feugiat in fermentum posuere. Lectus quam id leo in vitae
                          turpis massa. Id venenatis a condimentum vitae sapien pellentesque. </p>
        </div>

    );
  } else {
    return (
      <div className="tacPage">
        <p className="tacHeader"> <strong> Terms & Conditions </strong> </p>
        <p className="tacText"> <strong> Heading Goes Here </strong> <br /> Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Nulla facilisi etiam dignissim diam.
                        Turpis nunc eget lorem dolor sed viverra ipsum. Cursus risus at ultrices mi tempus.
                        Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. </p>

        <p className="tacText"> <strong> Heading Goes Here </strong> <br /> Turpis in eu mi bibendum. Fringilla urna porttitor rhoncus dolor purus.
                        Sed blandit libero volutpat sed cras ornare arcu dui vivamus.
                        Quam lacus suspendisse faucibus interdum. Diam donec
                        adipiscing tristique risus nec feugiat in fermentum posuere. Lectus quam id leo in vitae
                        turpis massa. Id venenatis a condimentum vitae sapien pellentesque. </p>

        <p className="tacText"> <strong> Heading Goes Here </strong> <br /> Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Nulla facilisi etiam dignissim diam.
                        Turpis nunc eget lorem dolor sed viverra ipsum. Cursus risus at ultrices mi tempus.
                        Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. </p>

        <p className="tacText"> <strong> Heading Goes Here </strong> <br /> Turpis in eu mi bibendum. Fringilla urna porttitor rhoncus dolor purus.
                        Sed blandit libero volutpat sed cras ornare arcu dui vivamus.
                        Quam lacus suspendisse faucibus interdum. Diam donec
                        adipiscing tristique risus nec feugiat in fermentum posuere. Lectus quam id leo in vitae
                        turpis massa. Id venenatis a condimentum vitae sapien pellentesque. </p>
      </div>
    );
  }
  }
}

export default TermsAndConditions;
