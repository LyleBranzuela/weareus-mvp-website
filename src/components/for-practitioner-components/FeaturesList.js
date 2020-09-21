import "./FeaturesList.css";
import React from "react";
import FeatureItem from "./FeatureItem";
import { Container, Row, Col } from "react-bootstrap";

class FeaturesList extends React.Component {
  render() {
    return (
      <Container className="featuresListStyle">
        <hr size="50" />
        <Row>
          <Col sm={6}>
            <FeatureItem
              id="site-feature-1"
              image="icon_word_of_mouth.png"
              alt="Word Of Mouth Feature Image"
              title="We make word-of-mouth work for you when everyone's talking online."
              description={
                <React.Fragment>
                  Word-of-mouth is the single most valuable marketing tool there
                  is. Research shows 84% of customers trust reviews more than
                  anything else when choosing services online.
                  <br />
                  <br />
                  We offer you a way to professionally profile your business to
                  potential clients, and provide them with all the information
                  they need to make an informed choice about booking with you
                  right now.
                  <br />
                  <br />
                  Reviews influence around two-thirds of purchasing decisions.
                  Become part of We are Us and make reviews work for you.
                </React.Fragment>
              }
            />
          </Col>
          <Col sm={6}>
            <FeatureItem
              id="site-feature-2"
              image="icon_connections.png"
              alt="Connections Feature Image"
              title="We help you create meaningful connections with clients looking for help."
              description={
                <React.Fragment>
                  Our users are actively engaged in searching for a variety of
                  health, wellness & self-improvement practitioners. They log on
                  to the We are Us website to find someone to help them achieve
                  their goals.
                  <br />
                  <br />
                  They can read reviews left by other clients then use this
                  information to help them make the decision to book with you.
                  Clients sharing their experiences means you'll be able to
                  create meaningful connections with others you may be able to
                  help.
                  <br />
                  <br />
                  After visiting, clients are encouraged (and incentivised) to
                  leave ratings or reviews. This is an easy way to build your
                  reputation as a trusted & qualified practitioner therefore
                  attracting new potential clients.
                </React.Fragment>
              }
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FeaturesList;
