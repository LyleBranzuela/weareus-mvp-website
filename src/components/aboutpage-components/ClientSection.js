import React from "react";
import "./ClientSection.css";
import { Container, Row, Col } from "react-bootstrap";

class ClientSection extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <img
              src={require("../../assets/images/weareus_team/team_charis_robinson.jpg")}
              alt="charis"
              id="mainFrame"
            />
            <h5 id="heavyHeader">Hi, I'm Charis.</h5>
            <p id="lightHeader">
              Let me tell you why I know how powerful client reviews can be to
              actually get bookings.
            </p>
            <p id="big-description">
              When I was living in Queenstown I needed to find a therapist to
              help me after an injury. I found a wonderful Bowen practitioner.
              But then I moved north to Auckland. And needed to find another
              practitioner.
              <br />
              <br />
              The internet's a wonderful thing, and so I did was what most
              people do. I searched for a new practitioner online. No one I knew
              could recommend anyone, and I was unsure of booking without
              personal recommendation. So I went without.
              <br />
              <br />
              But the seed of an idea was planted.
              <br />
              <br />
              With my background in visual communication I know that creating
              meaningful connections starts with how well you present visually
              and through the power of the right words.
              <br />
              <br />I developed We are Us as an online platform to help
              businesses in the health, wellness & self-improvement space to
              connect with new clients, and for clients to find out more about
              businesses can help them achieve their goals.
              <br />
              <br />
              I wanted the We are Us platform to be simple to use so you could
              focus your attention on what you really loved, helping clients.
              Helping you to attract new customers who're interested in what you
              offer because we've nailed the visual design and usability.
              <br />
              <br />I also wanted clients to be able to see independent feedback
              that would help them make the decision about who was best to help
              them achieve what they wanted for health, wellness &
              self-improvement.
              <br />
              <br />
              <strong>
                <blockquote></blockquote>
              </strong>
              <p id="clientMessage">
                What we do matters to help people grow. For us to move forward
                as a society, individually and collectively, must always be
                growing and learning. This is how progress is made.
              </p>
              <br />
              I've build a team around me to make sure that We are Us becomes
              the most reliable, professional place for clients and health and
              wellness professionals to come together. To keep evolving the We
              are Us platform as we go. Bringing a community to life.
              <br />
              <br />
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ClientSection;
