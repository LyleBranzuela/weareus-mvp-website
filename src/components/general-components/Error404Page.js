import "./Error404Page.css";
import React from "react";

class Error404Page extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  componentDidMount() {
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
      <div className="errorPageMobile">
        <p className="errorHeaderMobile"> <strong> Error 404: Page not found</strong> </p>
        <p className="errorTextMobile"> We could not find that page. <br /> 
                                        Sorry for the inconvenience. </p>
      </div>
      );
    }  else {
      return (
        <div className="errorPage">
          <p className="errorHeader"> <strong>Error 404: Page not found </strong> </p>
          <p className="errorText">  We could not find that page. <br /> 
                                        Sorry for the inconvenience.</p>
        </div>
      );
    }
  }
}

export default Error404Page;

