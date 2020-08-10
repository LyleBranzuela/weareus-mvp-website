import "./SubscriptionPlan.css";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

const SubscriptionPlan = (props) => {
  let { url } = useRouteMatch();
  const features = props.features.map((feature, index) => {
    return <li key={props.name + " Plan Feature " + index}>{feature}</li>;
  });

  return (
    <Card className="subscriptionCard">
      <Card.Header>
        <span id={props.id} className="planTypeStyle">
            {props.name}
        </span>
        <br />
        <span className="planTypeDescStyle">{props.description}</span>
        <br />
        <span className="planPriceStyle">${props.price}</span>
        <br />
        <span className="planTypeDescStyle">NZD/month</span>
        <br />
        <Button
          className="primaryCustomButtonStyle"
          id="getStartedRegisterButton"
          variant="primary"
          type="submit"
        >
          Get Started
        </Button>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <strong>Features</strong>
        </Card.Title>
        <ul id={props.id.concat("Features")}>{features}</ul>
        <Link to={`${url}/get-started`}></Link>
      </Card.Body>
    </Card>
  );
};
export default SubscriptionPlan;
