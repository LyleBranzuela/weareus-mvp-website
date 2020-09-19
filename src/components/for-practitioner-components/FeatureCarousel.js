import "./FeatureCarousel.css";
import React from "react";
import { Container, Carousel } from "react-bootstrap";

const FeatureCarousel = () => {
  return (
    <Container fluid className="featureCarouselStyle">
      <Container>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../../assets/images/screens/we_are_us_screen_1.png")}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../../assets/images/screens/we_are_us_screen_2.png")}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../../assets/images/screens/we_are_us_screen_3.png")}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </Container>
    </Container>
  );
};

export default FeatureCarousel;
