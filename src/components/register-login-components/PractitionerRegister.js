import "./PractitionerRegister.css";
import React from "react";
import { Container, CardGroup } from "react-bootstrap";
import SubscriptionPlan from "./SubscriptionPlan";

class PractitionerRegister extends React.Component {
  render() {
    const basicPlanFeatures = [
      "1 Mini website - listing on We are Us",
      "3-5 Main Pictures",
      "1 Business Logo",
      "About",
      "Services",
      "Qualifications",
      "Contact Details",
    ];
    const businessPlanFeatures = [
      "1 Mini website - listing on We are Us",
      "1 Main Picture",
      "1 Business Logo",
      "About",
      "Services",
      "Qualifications",
      "Contact Details",
    ];

    return (
      <Container>
        {/** Register As Practitioner Details */}
        <Container className="practitionerRegisterStyle">
          <h2>Become one of Us</h2>
          <h4 id="pracRegisterHeader">
            Pre-launch offer. Register NOW and get your 2nd Year Free!
          </h4>
          <p id="pracRegisterDesc">
            Register with We are Us before 31 Dec 2018 and we'll give you your
            second year free. Just to say a massive, big thank you for
            supporting us right at the beginning of our journey.
            <br />
            <br />
            When you sign up with We are Us we get you started in the best
            possible way. Providing you with templates and information to help
            you showcase your business. We've teamed up with health & wellness
            copywriters and visual design experts to provide you with cracking
            tips to help your profile your business professionally, highlighting
            your services without being sales-y.
            <br />
            <br />
            The result? A professional, branded, consistent marketing space for
            you to confidently connect with new clients.
          </p>
          <hr size="50" />
        </Container>

        {/** Card Group for The Subscription Plans */}
        <Container className="subscriptionGroup">
          <span id="subscriptionCardsHeader">
            How would you like to join Us?
          </span>
          <CardGroup>
            <SubscriptionPlan
              id="basicPlan"
              name="Basic"
              description="Great for those starting out"
              price="30"
              features={basicPlanFeatures}
            />
            <SubscriptionPlan
              id="businessPlan"
              name="Business"
              description="Great for growing your business"
              price="100"
              features={businessPlanFeatures}
            />
          </CardGroup>
        </Container>
      </Container>
    );
  }
}

export default PractitionerRegister;
