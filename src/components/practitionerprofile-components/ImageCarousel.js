import React from "react";
import "./ImageCarousel.css";
import { Carousel } from "react-bootstrap";

class ImageCarousel extends React.Component {
  render() {
    return (
      <div>
        <Carousel className="pracPersonalCarousel" autoPlay>
          <Carousel.Item>
            <img
              className="carousel-img-margin"
              src={require("../../assets/images/placeholders/prac_image_carousel_placeholder.jpg")}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carousel-img-margin"
              src={require("../../assets/images/placeholders/prac_image_carousel_placeholder.jpg")}
              alt="second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carousel-img-margin"
              src={require("../../assets/images/placeholders/prac_image_carousel_placeholder.jpg")}
              alt="third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default ImageCarousel;
