import React from "react";
import "./ImageCarousel.css";
import { Carousel } from "react-bootstrap";

class ImageCarousel extends React.Component {
  render() {
    return (
      <div>
        <Carousel autoplay>
          <Carousel.Item>
            <h3>1</h3>
            <img
              className="d-block w-100"
              src={require("../../assets/images/placeholders/prac_image_carousel_placeholder.jpg")}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <h3>1</h3>
            <img
              className="d-block w-100"
              src={require("../../assets/images/placeholders/prac_image_carousel_placeholder.jpg")}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <h3>1</h3>
            <img
              className="d-block w-100"
              src={require("../../assets/images/placeholders/prac_image_carousel_placeholder.jpg")}
              alt="First slide"
            />
          </Carousel.Item>
          
        </Carousel>
        
      </div>
    );
  }
}

export default ImageCarousel;
