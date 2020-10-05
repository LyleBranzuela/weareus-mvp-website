import React from "react";
import "./PracticeImageCarousel.css";
import { Carousel } from "react-bootstrap";

class PracticeImageCarousel extends React.Component {
  render() {
    return (
      <div>
        <Carousel className="practice-img-carousel" autoPlay>
          <Carousel.Item>
            <img
              className="carousel-img"
              src={require("../../assets/images/placeholders/prac_image_carousel_placeholder.jpg")}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carousel-img"
              src={require("../../assets/images/placeholders/prac_image_carousel_placeholder.jpg")}
              alt="second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carousel-img"
              src={require("../../assets/images/placeholders/prac_image_carousel_placeholder.jpg")}
              alt="third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default PracticeImageCarousel;
