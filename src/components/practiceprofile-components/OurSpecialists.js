import React from "react";
import "./OurSpecialists.css";
import { Card } from "react-bootstrap";

class OurSpecialists extends React.Component {
  render() {
    return (
      <Card className="our-specialists">
        <Card>
          <Card.Body>
            <Card.Title>Our Specialists</Card.Title>

            {/* Specialists 1 */}
            <Card.Img
              alt=""
              className="placeholder-img-frame"
              src={require("../../assets/images/placeholders/prac_profile_placeholder.jpg")}
              roundedCirle
            />
            <Card.Text>
              <h5 id="specialists-name">Name Surname</h5>
              Herbal Medicine, Massage, Reiki
            </Card.Text>
          </Card.Body>
        </Card>
        {/* Specialists 2 */}
        <Card>
          <Card.Body>
            <Card.Img
              alt="placeholder-img"
              className="placeholder-img-frame"
              src={require("../../assets/images/placeholders/prac_profile_placeholder.jpg")}
              roundedCirle
            />
            <Card.Text>
              <h5 id="specialists-name">Long-Name Long-Surname</h5>
              Herbal Medicine, Massage, Reiki
            </Card.Text>
          </Card.Body>
        </Card>

        {/* Specialists 3 */}
        <Card>
          <Card.Body>
            <Card.Img
              alt=""
              className="placeholder-img-frame"
              src={require("../../assets/images/placeholders/prac_profile_placeholder.jpg")}
              roundedCirle
            />
            <Card.Text>
              <h5 id="specialists-name">Name Surname</h5>
              Herbal Medicine, Massage, Reiki
            </Card.Text>
          </Card.Body>
        </Card>

        {/* Specialists 4 */}
        <Card>
          <Card.Body>
            <Card.Img
              alt="placeholder-img"
              className="placeholder-img-frame"
              src={require("../../assets/images/placeholders/prac_profile_placeholder.jpg")}
              roundedCirle
            />
            <Card.Text>
              <h5 id="specialists-name">Long-Name Long-Surname</h5>
              Herbal Medicine, Massage, Reiki
            </Card.Text>
          </Card.Body>
        </Card>
{/* 
        <Card>
          <Card.Body>
            <Card.Img
              alt="placeholder-img"
              className="placeholder-img-frame"
              src={require("../../assets/images/placeholders/prac_profile_placeholder.jpg")}
              roundedCirle
            />
            <Card.Text>
              <h5 id="specialists-name">Long-Name Long-Surname</h5>
              Herbal Medicine, Massage, Reiki
            </Card.Text>
          </Card.Body>
        </Card> */}
      </Card> //END OF Card containter holding inner cards
    );
  }
}

export default OurSpecialists;
