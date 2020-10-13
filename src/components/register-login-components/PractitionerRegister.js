import "./PractitionerRegister.css";
import React from "react";
import { Container, Card, CardGroup, Accordion } from "react-bootstrap";
import SubscriptionPlan from "./SubscriptionPlan";
import { Link } from "react-router-dom";
import api from "../../api/api";

class PractitionerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Get All The Subscription Plans from the Server
  getAllSubscriptions = async () => {
    const subscriptionResponse = await api.get("/subscriptions");
    // Setting the Subscriptions State
    this._isMounted &&
      this.setState({
        subscriptions: subscriptionResponse.data,
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getAllSubscriptions();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    // Map a list element with each item in the subscription plan
    let planList = [];
    if (this.state.subscriptions) {
      planList = this.state.subscriptions.map((subscription) => {
        // Loop Through The Features of the Subscription Plan
        let featureList = subscription.features.map((feature) => {
          return feature.feature_name;
        });
        return (
          <SubscriptionPlan
            key={`${subscription.subscription_id}Plan_Key`}
            id={subscription.subscription_id}
            name={subscription.subscription_name}
            description={subscription.description}
            price={subscription.price}
            subscriptionType={subscription.subscription_name}
            features={featureList}
          />
        );
      });
    }
    return (
      <Container fluid>
        {/* Register As Practitioner Details */}
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
            {/** Cards For the Subscription Plans */}
            {planList}
          </CardGroup>
          {/** Additional Information Section*/}
          <p>
            *
            <br />
            The team behind We are Us are experts in visual communication and
            how best to market your business through our site. As such, we
            review the copy and images that you upload before it is published to
            the site. We will provide you with feedback on how to improve the
            copy and images should if it is needed to enhance the impact of your
            listing.
          </p>
        </Container>

        {/** FAQ Section for The Subscription Plans*/}
        <Container fluid className="faqSection">
          <Container>
            <h2>FAQ</h2>
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Help. How do I know what to write?
                  <img
                    src={require("../../assets/icons/accordion_arrow.svg")}
                    alt="accordion_arrow"
                  />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec commodo eget justo id volutpat. Praesent faucibus
                    vestibulum odio. Nullam lacinia rutrum velit scelerisque
                    rutrum.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  How does this 12 month 50% off deal work?
                  <img
                    src={require("../../assets/icons/accordion_arrow.svg")}
                    alt="accordion_arrow"
                  />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec commodo eget justo id volutpat. Praesent faucibus
                    vestibulum odio. Nullam lacinia rutrum velit scelerisque
                    rutrum.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <br />
              <Link to={`/for-practitioner`}>
                <u>Join We are Us now</u>
              </Link>
              <br />
              <Link to="contact-us">
                <u>Want to talk it over? Drop us a line</u>
              </Link>
            </Accordion>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default PractitionerRegister;
