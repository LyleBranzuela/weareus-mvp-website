import React from "react";
import "./TeamSection.css";
import { Container, Col, Row } from "react-bootstrap";
import strapi from "../../api/strapi.js";

class TeamSection extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      teamName1: "",
      teamTitle1: "",
      teamInfo1: "",
      teamName2: "",
      teamTitle2: "",
      teamInfo2: "",
      teamName3: "",
      teamTitle3: "",
      teamInfo3: "",
      teamName4: "",
      teamTitle4: "",
      teamInfo4: "",
      teamName5: "",
      teamTitle5: "",
      teamInfo5: "",
      teamImage1: "",
      teamImage2: "",
      teamImagePlaceholder: ""
    };
  }


  getPageContent = async () => {
    let pageContent = {};

    // Get requests to retrieve JSON information from Strapi
    const getName1 = await strapi.get("/copies/35");
    const getTitle1 = await strapi.get("/copies/36");
    const getInfo1 = await strapi.get("/copies/37");

    const getName2 = await strapi.get("/copies/38");
    const getTitle2 = await strapi.get("/copies/39");
    const getInfo2 = await strapi.get("/copies/40");

    const getName3 = await strapi.get("/copies/41");
    const getTitle3 = await strapi.get("/copies/42");
    const getInfo3 = await strapi.get("/copies/43");

    const getName4 = await strapi.get("/copies/44");
    const getTitle4 = await strapi.get("/copies/45");
    const getInfo4 = await strapi.get("/copies/46");

    const getName5 = await strapi.get("/copies/47");
    const getTitle5 = await strapi.get("/copies/48");
    const getInfo5 = await strapi.get("/copies/49");


    const getImage1 = await strapi.get("/images/9");
    const getImage2 = await strapi.get("/images/10");
    const getImagePlaceholder = await strapi.get("/images/7");


    pageContent.memberName1 = JSON.stringify(getName1.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    pageContent.memberName2 = JSON.stringify(getName2.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    pageContent.memberName3 = JSON.stringify(getName3.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    pageContent.memberName4 = JSON.stringify(getName4.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    pageContent.memberName5 = JSON.stringify(getName5.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.memberTitle1 = JSON.stringify(getTitle1.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    pageContent.memberTitle2 = JSON.stringify(getTitle2.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    pageContent.memberTitle3 = JSON.stringify(getTitle3.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    pageContent.memberTitle4 = JSON.stringify(getTitle4.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    pageContent.memberTitle5 = JSON.stringify(getTitle5.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");


    pageContent.memberInfo1 = JSON.stringify(getInfo1.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    pageContent.memberInfo2 = JSON.stringify(getInfo2.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    pageContent.memberInfo3 = JSON.stringify(getInfo3.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    pageContent.memberInfo4 = JSON.stringify(getInfo4.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");
    pageContent.memberInfo5 = JSON.stringify(getInfo5.data.copyText)
      .replace(/\\n/g, "\n")
      .replace(/"/g, "");

    pageContent.teamImage1 = JSON.stringify(getImage1.data.imageURL).replace(/"/g, "");
    pageContent.teamImage2 = JSON.stringify(getImage2.data.imageURL).replace(/"/g, "");
    pageContent.placeholderImage = JSON.stringify(getImagePlaceholder.data.imageURL).replace(/"/g, "");

    this.setState({
      teamName1: pageContent.memberName1,
      teamTitle1: pageContent.memberTitle1,
      teamInfo1: pageContent.memberInfo1,
      teamName2: pageContent.memberName2,
      teamTitle2: pageContent.memberTitle2,
      teamInfo2: pageContent.memberInfo2,
      teamName3: pageContent.memberName3,
      teamTitle3: pageContent.memberTitle3,
      teamInfo3: pageContent.memberInfo3,
      teamName4: pageContent.memberName4,
      teamTitle4: pageContent.memberTitle4,
      teamInfo4: pageContent.memberInfo4,
      teamName5: pageContent.memberName5,
      teamTitle5: pageContent.memberTitle5,
      teamInfo5: pageContent.memberInfo5,
      teamImage1: pageContent.teamImage1,
      teamImage2: pageContent.teamImage2,
      teamImagePlaceholder: pageContent.placeholderImage
    });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getPageContent();
  }



  render() {
    const memberImage1 = strapi.defaults.baseURL + this.state.teamImage1;
    const memberImage2 = strapi.defaults.baseURL + this.state.teamImage2;
    const placeholderImage = strapi.defaults.baseURL + this.state.teamImagePlaceholder;
    return (
      <div>
        <Container
          fluid
          className="bottom-padding teamSectionStyle container-margin-position"
        >
          <Row>
            <Col sm={4} id="team-column-padding">
              <img
                src={memberImage1}
                alt="about dan"
                id="emp-frame"
              />
              <h4 id="name"> {this.state.teamName1} </h4>
              <h4 id="role"> {this.state.teamTitle1} </h4>

              <p id="team-description">
                {this.state.teamInfo1}
              </p>
              <a href="https://designcabin.co.nz">designcabin.co.nz</a>
            </Col>

            <Col sm={4} id="team-column-padding">
              <img
                src={memberImage2}
                alt="about walter"
                id="emp-frame"
              />
              <h4 id="name">{this.state.teamName2}</h4>
              <h4 id="role">{this.state.teamTitle2}</h4>
              <p id="team-description">
                {this.state.teamInfo2}
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm={4} id="team-column-padding">
              {/* Uncomment code below with appropriate jpg file name to produce circular employee image */}

              {/* <img
              src={require("../../assets/images/weareus_team/team_dan_matthews.jpg")}
              alt="katrin-image"
              id="emp-frame"
            /> */}

              <img
                src={placeholderImage}
                alt="about dan"
                id="emp-frame"
              />

              <h4 id="name">{this.state.teamName3}</h4>
              <h4 id="role">{this.state.teamTitle3}</h4>
              <p id="team-description">
                {this.state.teamInfo3}
              </p>
              <a href="https://wordsforwellness.com">wordsforwellness.com</a>
            </Col>
            <Col sm={4} id="team-column-padding">
              {/* Uncomment code below with appropriate jpg file name to produce circular employee image */}

              {/* <img 
              src={require("../../assets/images/weareus_team/team_dan_matthews.jpg")}
              alt="fraser-image"
              id="emp-frame"
            /> */}

              <img
                src={placeholderImage}
                alt="about dan"
                id="emp-frame"
              />

              <h4 id="name">{this.state.teamName4}</h4>
              <h4 id="role">{this.state.teamTitle4}</h4>
              <p id="team-description">
                {this.state.teamInfo4}
              </p>
              <a href="https://gardyneholt.co.nz">gardyneholt.co.nz</a>
            </Col>
          </Row>
          <Row>
            <Col sm={4} id="team-column-padding">
              {/* Uncomment code below with appropriate jpg file name to produce circular employee image  */}

              {/* <img
                src={require("../../assets/images/weareus_team/team_dan_matthews.jpg")}
                alt="silverlane-image"
                id="emp-frame"
              />  */}

              <img
                src={placeholderImage}
                alt="about dan"
                id="emp-frame"
              />

              <h4 id="name">{this.state.teamName5}</h4>
              <h4 id="role">{this.state.teamTitle5}</h4>
              <p id="team-description">
                {this.state.teamInfo5}
              </p>
              <a href="https://silverlane.agency">silverlane.agency</a>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default TeamSection;