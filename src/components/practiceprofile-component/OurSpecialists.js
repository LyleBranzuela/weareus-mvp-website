import React from 'react'
import "./OurSpecialists.css"
import { Card } from "react-bootstrap";

class OurSpecialists extends React.Component {
    render (){
        return (
            <Card border="light" className="-our-specialist">
                <Card.Body>
                    <Card.Title>Our specialists</Card.Title>
                    {/* Specialists 1 */}
                    <Card.Img
                        alt= ""
                        className="placeholder-img-frame"
                        src={require("../../assets/images/placeholders/prac_profile_placeholder.jpg")}
                        roundedCirle
                    />
                    <Card.Text>
                        <h5 id="specialists-name">Name Surname</h5>
                        Herbal Medicine, Massage, Reiki
                    </Card.Text>

                    {/* Specialists 2 */}
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

                    {/* Specialists 3 */}
                    <Card.Img
                        alt="placeholder-img"
                        className="placeholder-img-frame"
                        src={require("../../assets/images/placeholders/prac_profile_placeholder.jpg")}
                        roundedCirle
                    />
                    <Card.Text>
                        <h5 id="specialists-name">Name Surname</h5>
                        Herbal Medicine
                    </Card.Text>

                    {/* Specialists 4 */}
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
        );
    }
}

export default OurSpecialists;