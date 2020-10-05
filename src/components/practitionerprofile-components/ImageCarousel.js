import React from "react";
import "./ImageCarousel.css";
import { Carousel } from "react-bootstrap";

class ImageCarousel extends React.Component {
  render() {
    return (
      <div>
        <Carousel className="pracPersonalCarousel" autoPlay>
          {/** Loop Through the Cover Images */}
          {/* {this.props.cover_images &&
            this.props.cover_images.map((cover_image, index) => {
              return (
                <Carousel.Item key={cover_image.image_id}>
                  <img
                    className="carousel-img-margin"
                    src={require(cover_image.image_url)}
                    alt={`${index}-pracititioner-slide`}
                  />
                </Carousel.Item>
              );
            })} */}
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
