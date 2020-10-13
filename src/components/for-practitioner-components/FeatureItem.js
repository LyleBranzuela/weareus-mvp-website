import "./FeatureItem.css";
import React from "react";

class FeatureItem extends React.Component {
  render() {
    return (
      <div className="featureListItem" id={this.props.id}>
        <span>
          <img
            alt={this.props.alt}
            variant="top"
            src={require("../../assets/images/" + this.props.image)}
          />
        </span>
        <h5>{this.props.title}</h5>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default FeatureItem;
