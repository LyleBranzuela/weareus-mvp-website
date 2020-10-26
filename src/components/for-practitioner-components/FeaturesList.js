import "./FeaturesList.css";
import React from "react";
import FeatureItem from "./FeatureItem";
import { Container, Row, Col } from "react-bootstrap";
import strapi from "../../api/strapi.js";

class FeaturesList extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      featureListHeader1: "",
      featureListHeader2: "",
      featureListText1: "",
      featureListText2: "",
      featureListIcon1: "",
      featureListIcon2: "",
    };
  }

  getPageContent = async () => {
    let pageContent = {};

    // Get requests to retrieve JSON information from Strapi
    const getListHeader1 = await strapi.get("/copies/18");
    const getListContent1 = await strapi.get("/copies/19");
    const getListHeader2 = await strapi.get("/copies/20");
    const getListContent2 = await strapi.get("/copies/21");
    const getListIcon1 = await strapi.get("/images/5");
    const getListIcon2 = await strapi.get("/images/6");

    pageContent.listHeader1 = JSON.stringify(getListHeader1.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.listContent1 = JSON.stringify(getListContent1.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.listHeader2 = JSON.stringify(getListHeader2.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.listContent2 = JSON.stringify(getListContent2.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.listIcon1 = JSON.stringify(getListIcon1.data.imageURL).replace(
      /"/g,
      ""
    );
    pageContent.listIcon2 = JSON.stringify(getListIcon2.data.imageURL).replace(
      /"/g,
      ""
    );

    this._isMounted &&
      this.setState({
        featureListHeader1: pageContent.listHeader1,
        featureListHeader2: pageContent.listHeader2,
        featureListText1: pageContent.listContent1,
        featureListText2: pageContent.listContent2,
        featureListIcon1: pageContent.listIcon1,
        featureListIcon2: pageContent.listIcon2,
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getPageContent();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const icon1 = strapi.defaults.baseURL + this.state.featureListIcon1;
    const icon2 = strapi.defaults.baseURL + this.state.featureListIcon2;
    return (
      <Container className="featuresListStyle">
        <hr size="50" />
        <Row>
          <Col sm={6}>
            <FeatureItem
              id="site-feature-1"
              image={icon1}
              alt="Word Of Mouth Feature Image"
              title={this.state.featureListHeader1}
              description={
                <React.Fragment>{this.state.featureListText1}</React.Fragment>
              }
            />
          </Col>
          <Col sm={6}>
            <FeatureItem
              id="site-feature-2"
              image={icon2}
              alt="Connections Feature Image"
              title={this.state.featureListHeader2}
              description={
                <React.Fragment>{this.state.featureListText2}</React.Fragment>
              }
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FeaturesList;
