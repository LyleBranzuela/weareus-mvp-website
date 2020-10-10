import "./SubscriptionPlan.css";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomButton from "../general-components/CustomButton";

class SubscriptionPlan extends React.Component {
  render() {
    // Loop Through the Features each Subscription plan from the prop has
    const features = this.props.features.map((feature, index) => {
      return (
        <li key={this.props.name + " Plan Feature " + index}>{feature}</li>
      );
    });

    return (
      <Card className="subscriptionCard">
        {/** Subscription Card Layout */}
        <Card.Header>
          <span id={this.props.id} className="planTypeStyle">
            {this.props.name}
          </span>
          <br />
          <span className="planTypeDescStyle">{this.props.description}</span>
          <br />
          <span className="planPriceStyle">${this.props.price}</span>
          <br />
          <span className="planTypeDescStyle">NZD/month</span>
          <br />
          <Link
            to={{
              pathname: "/membership-form",
              state: {
                subscription_id: this.props.id,
                subscriptionType: this.props.subscriptionType,
                price: this.props.price,
              },
            }}
          >
            <CustomButton
              id="getStartedRegisterButton"
              type="submit"
              text="Get Started"
            />
          </Link>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <strong>Features</strong>
          </Card.Title>
          <ul id={`${this.props.id}-feature-id`}>{features}</ul>
        </Card.Body>
      </Card>
    );
  }
}
export default SubscriptionPlan;
