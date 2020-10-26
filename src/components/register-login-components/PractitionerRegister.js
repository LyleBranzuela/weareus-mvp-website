import "./PractitionerRegister.css";
import React from "react";
import { Container, Card, CardGroup, Accordion } from "react-bootstrap";
import SubscriptionPlan from "./SubscriptionPlan";
import { Link } from "react-router-dom";
import api from "../../api/api";
import strapi from "../../api/strapi.js";

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
        headerMainText: "",
        headerSubText: "",
        headerDescription: "",
        subPlansHeader: "",
        subPlansInfo: "",
        faqHeader1: "",
        faqText1: "",
        faqHeader2: "",
        faqText2:"",
        faqJoinUs: "",
        faqContactUs: ""
      });
  };

  getPageContent = async () => {
    let pageContent = {};

    // Get requests to retrieve JSON information from Strapi
    const getHeaderMainText = await strapi.get("/copies/6");
    const getHeaderSubText = await strapi.get("/copies/7");
    const getHeaderDescription = await strapi.get("/copies/8");
    const getSubPlansHeader = await strapi.get("/copies/9");
    const getSubPlansInfo = await strapi.get("/copies/10");
    const getFAQHeader1 = await strapi.get("/copies/11");
    const getFAQText1 = await strapi.get("/copies/12");
    const getFAQHeader2 = await strapi.get("/copies/13");
    const getFAQText2 = await strapi.get("/copies/14");
    const getFAQJoin = await strapi.get("/copies/15");
    const getFAQContact = await strapi.get("/copies/16");

    pageContent.registerMain = JSON.stringify(getHeaderMainText.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.registerSub = JSON.stringify(getHeaderSubText.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.registerDesc= JSON.stringify(getHeaderDescription.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.subPlanHeader= JSON.stringify(getSubPlansHeader.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    
    pageContent.subPlansInfo = JSON.stringify(getSubPlansInfo.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.faqHeader1 = JSON.stringify(getFAQHeader1.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.faqText1 = JSON.stringify(getFAQText1.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    
    pageContent.faqHeader2 = JSON.stringify(getFAQHeader2.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    
    pageContent.faqText2 = JSON.stringify(getFAQText2.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.faqJoin = JSON.stringify(getFAQJoin.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.faqContact = JSON.stringify(getFAQContact.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");


    this.setState({ headerMainText: pageContent.registerMain,
                    headerSubText: pageContent.registerSub,
                    headerDescription: pageContent.registerDesc,
                    subPlansHeader: pageContent.subPlanHeader,
                    subPlansInfo: pageContent.subPlansInfo,
                    faqHeader1: pageContent.faqHeader1,
                    faqText1: pageContent.faqText1,
                    faqHeader2: pageContent.faqHeader2,
                    faqText2: pageContent.faqText2,
                    faqJoinUs: pageContent.faqJoin,
                    faqContactUs: pageContent.faqContact});
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getAllSubscriptions();
    this._isMounted && this.getPageContent();
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
          <h2> {this.state.headerMainText} </h2>
          <h4 id="pracRegisterHeader">
            {this.state.headerSubText}
          </h4>
          <p id="pracRegisterDesc">
            {this.state.headerDescription}
          </p>
          <hr size="50" />
        </Container>

        {/** Card Group for The Subscription Plans */}
        <Container className="subscriptionGroup">
          <span id="subscriptionCardsHeader">
            {this.state.subPlansHeader}
          </span>
          <CardGroup>
            {/** Cards For the Subscription Plans */}
            {planList}
          </CardGroup>
          {/** Additional Information Section*/}
          <p>
            {this.state.subPlansInfo}
          </p>
        </Container>

        {/** FAQ Section for The Subscription Plans*/}
        <Container fluid className="faqSection">
          <Container>
            <h2>FAQ</h2>
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  {this.state.faqHeader1}
                  <img
                    src={require("../../assets/icons/accordion_arrow.svg")}
                    alt="accordion_arrow"
                  />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                  {this.state.faqText1}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                {this.state.faqHeader2}
                  <img
                    src={require("../../assets/icons/accordion_arrow.svg")}
                    alt="accordion_arrow"
                  />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                  {this.state.faqText2}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <br />
              <Link to={`/for-practitioner`}>
                <u>{this.state.faqJoinUs}</u>
              </Link>
              <br />
              <Link to="contact-us">
                <u>{this.state.faqContactUs}</u>
              </Link>
            </Accordion>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default PractitionerRegister;
