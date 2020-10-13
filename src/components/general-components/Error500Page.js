import "./ErrorPage.css";
import React from "react";

class Error500Page extends React.Component {
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
        <p className="errorHeaderMobile"> <strong> Error 500: Internal Server Errord</strong> </p>
        <p className="errorTextMobile"> An issue has occured on our end. <br /> 
                                        Sorry for the inconvenience. </p>
      </div>
      );
    }  else {
      return (
        <div className="errorPage">
          <p className="errorHeader"> <strong>Error 500: Internal Server Error</strong> </p>
          <p className="errorText">  An issue has occured on our end. <br /> 
                                            Sorry for the inconvenience.</p>
        </div>
      );
    }
  }
}

export default Error500Page;

