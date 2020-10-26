import React from "react";
import "./ContactCard.css";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CustomButton from "../general-components/CustomButton";

class ContactCard extends React.Component {
  render() {
    return (
      <Card className="contact-card-box">
        <Card.Body>
          <Card.Title>Contact Details</Card.Title>
          <Card.Subtitle>
            {/* Practitioner Name */}
            {this.props.company_name}
          </Card.Subtitle>
          <Card.Text>
            {this.props.company_address1
              .split(", ")
              .filter(function (e) {
                return e !== "null";
              })
              .join(", ")}
            <br />
            {this.props.company_address2
              .split(", ")
              .filter(function (e) {
                return e !== "null";
              })
              .join(", ")}
            <span className="horizontal-line-card"></span>
            <a href="/#" id="purple-card-heading">
              {this.props.phone.slice(0, 3)} (0)
              {this.props.phone.slice(3, 5)} {this.props.phone.slice(5, 8)}{" "}
              {this.props.phone.slice(8)}
            </a>
            <span className="horizontal-line-card"></span>
            <a href="/#" id="purple-card-heading">
              {this.props.email}
            </a>

            {this.props.isLoggedIn &&
              this.props.user_information.company_id ===
                this.props.company_id &&
              this.props.user_information.user_type === "practitioner" && (
                <Link to={`/edit-profile`} className="mb-2">
                  <CustomButton id="editProfileButton" text="Edit Profile" />
                </Link>
              )}

            {this.props.isLoggedIn &&
              this.props.user_information.user_type === "admin" && (
                <Link
                  to={{
                    pathname: `/edit-profile`,
                    state: {
                      user_id: this.props.user_id,
                      company_id: this.props.company_id,
                    },
                  }}
                  className="mb-2"
                >
                  <CustomButton
                    id="editProfileButton"
                    text="Edit Profile As Admin"
                  />
                </Link>
              )}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    user_information: state.userReducer.user_information,
  };
};

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps())(ContactCard);
