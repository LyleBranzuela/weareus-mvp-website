import "./FeatureCarousel.css";
import React from "react";
import { Container, Carousel } from "react-bootstrap";
import strapi from "../../api/strapi.js";

class FeatureCarousel extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      image1: "",
      image2: "",
      image3: "",
    };

    this._isMounted = false;
  }

  getPageContent = async () => {
    let pageContent = {};

    // Get requests to retrieve JSON information from Strapi
    const getImage1 = await strapi.get("/images/11");
    const getImage2 = await strapi.get("/images/12");
    const getImage3 = await strapi.get("/images/13");

    pageContent.getImage1 = JSON.stringify(getImage1.data.imageURL).replace(
      /"/g,
      ""
    );
    pageContent.getImage2 = JSON.stringify(getImage2.data.imageURL).replace(
      /"/g,
      ""
    );
    pageContent.getImage3 = JSON.stringify(getImage3.data.imageURL).replace(
      /"/g,
      ""
    );

    this._isMounted &&
      this.setState({
        image1: pageContent.getImage1,
        image2: pageContent.getImage2,
        image3: pageContent.getImage3,
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getPageContent();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  render() {
    const image1 = strapi.defaults.baseURL + this.state.image1;
    const image2 = strapi.defaults.baseURL + this.state.image2;
    const image3 = strapi.defaults.baseURL + this.state.image3;
    return (
      <Container fluid className="featureCarouselStyle">
        <Container>
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={image1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={image2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={image3} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
        </Container>
      </Container>
    );
  }
}

export default FeatureCarousel;
