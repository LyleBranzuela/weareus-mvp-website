import React from "react";
import "./TeamSection.css";
<<<<<<< Updated upstream
function TeamSection() {
  return (
    <div>
      <div className="container-fluid bottom-padding teamSectionStyle aboutFluidContainer">
        <div className="row">
          <div className="col">
            <img
              src={require("../../assets/images/weareus_team/team_dan_matthews.jpg")}
              alt="dan-image"
              id="emp-frame"
            />
            <h4 id="name">Dan Matthews</h4>
            <h4 id="role">Creative Director</h4>

            <p id="team-description">
              We are Us is such a unique platform that I needed some special
              talents around. And Dan fits that brilliantly. He brings to We are
              Us international experience with branding projects including with
              My Food Bag, Te Uru and The Great Catering Company. Dan's also
              managed large-scale brand and design projects for Auckland
              Airport, New Zealand Trade and Enterprise and Te Wānanga o
              Aotearoa.
              <br />
              <br />
              What does he do with all that experience? He makes sure that
              everything We are Us does connects with both health, wellness &
              self-improvement professionals and their clients. So your business
              can be presented in the best possible way.
            </p>
            <a href="https://designcabin.co.nz">designcabin.co.nz</a>
          </div>
          <div className="col">
            <img
              src={require("../../assets/images/weareus_team/team_walter_rumbsy.jpg")}
              alt="walter-image"
              id="emp-frame"
            />
            <h4 id="name">Walter Rumbsy</h4>
            <h4 id="role">Creative Director</h4>
            <p id="team-description">
              With all things online I needed a web developer that could support
              the incredible dreams I have for We are Us. I want to provide you
              with a service that's reliable, responsive and does what it says
              on the packet.
              <br />
              <br />
              With a background with the big-names (Xero, Orion Health and My
              Food Bag) as a lead developer, head of engineering and front-end
              practice lead, Walt's our man. Most of what Walt does is totally
              beyond me but I do know that Walt makes all the behind-the-scenes
              code work to ensure that your experience is top notch and seamless
              for both practitioners and users.
            </p>
          </div>
        </div>
        {/* Row 2 */}
        <div className="row">
          <div className="col">
            {/* Uncomment code below with appropriate jpg file name to produce circular employee image */}
=======
import { Container, Col, Row } from "react-bootstrap";

class TeamSection extends React.Component {
  render() {
    return (
      <div>
        <Container
          fluid
          className="bottom-padding teamSectionStyle container-margin-position"
        >
          <Row>
            <Col sm={4} id="team-column-padding">
                <img
                  src={require("../../assets/images/weareus_team/team_dan_matthews.jpg")}
                  alt="about dan"
                  id="emp-frame"
                />
                <h4 id="name">Dan Matthews</h4>
                <h4 id="role">Creative Director</h4>

                <p id="team-description">
                  We are Us is such a unique platform that I needed some special
                  talents around. And Dan fits that brilliantly. He brings to We
                  are Us international experience with branding projects
                  including with My Food Bag, Te Uru and The Great Catering
                  Company. Dan's also managed large-scale brand and design
                  projects for Auckland Airport, New Zealand Trade and
                  Enterprise and Te Wānanga o Aotearoa.
                  <br />
                  <br />
                  What does he do with all that experience? He makes sure that
                  everything We are Us does connects with both health, wellness
                  & self-improvement professionals and their clients. So your
                  business can be presented in the best possible way.
                </p>
                <a href="https://designcabin.co.nz">designcabin.co.nz</a>
            </Col>
>>>>>>> Stashed changes

            <Col sm={4} id="team-column-padding">
              <img
                src={require("../../assets/images/weareus_team/team_walter_rumbsy.jpg")}
                alt="about walter"
                id="emp-frame"
              />
              <h4 id="name">Walter Rumbsy</h4>
              <h4 id="role">Creative Director</h4>
              <p id="team-description">
                With all things online I needed a web developer that could
                support the incredible dreams I have for We are Us. I want to
                provide you with a service that's reliable, responsive and does
                what it says on the packet.
                <br />
                <br />
                With a background with the big-names (Xero, Orion Health and My
                Food Bag) as a lead developer, head of engineering and front-end
                practice lead, Walt's our man. Most of what Walt does is totally
                beyond me but I do know that Walt makes all the
                behind-the-scenes code work to ensure that your experience is
                top notch and seamless for both practitioners and users.
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

              {/* Comment below span tag out to remove grey circle */}
              <span id="emp-frame"></span>

              <h4 id="name">Katrin Pace</h4>
              <h4 id="role">Copy Writer</h4>
              <p id="team-description">
                We are Us is such a unique platform that I needed some special
                talents around. And Dan fits that brilliantly. He brings to We
                are Us international experience with branding projects including
                with My Food Bag, Te Uru and The Great Catering Company. Dan's
                also managed large-scale brand and design projects for Auckland
                Airport. New Zealand Trade and Enterprise and Te Wananga o
                Aotearoa.
                <br />
                <br />
                What does he do with all that experience? He makes sure that
                everything We are Us does connects with both health, wellness &
                self-improvement professionals and their clients. So your
                business can be presented in the best possible way.
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

              {/* Comment below span tag out to remove grey circle */}
              <span id="emp-frame"></span>

              <h4 id="name">Fraser Gardyne</h4>
              <h4 id="role">Business Mentor</h4>
              <p id="team-description">
                Fraser has been invaluable in mentoring me through the whole
                process from when I first thought of We are Us through to
                building the plan and beyond. And I couldn't have hoped for a
                more qualified mentor. With a background in print and digital
                design, Fraser's been the judge in national and international
                design awards, so really knows what looks good. His contribution
                to New Zealand design was recognised in 2011 when he was awarded
                the prestigious Designers Institute Black Pin Award.
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

              {/* Comment below span tag out to remove grey circle */}
              <span id="emp-frame"></span>

              <h4 id="name">Silverlane</h4>
              <h4 id="role">Marketing</h4>
              <p id="team-description">
                These guys are based in Melbourne but I've been so wowed by the
                work that they do that we've teamed up with them so they can
                guide us in our marketing strategy. These guys are experts at
                what they do. Since 2012, Silverlane have advised over 700
                businesses on digital and brand strategy. They've been able to
                draw some conclusions about what works and what really doesn't.
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
