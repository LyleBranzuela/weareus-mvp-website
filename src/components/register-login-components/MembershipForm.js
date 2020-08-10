import "./MembershipForm.css";
import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";

class MembershipForm extends React.Component {
  render() {
    return (
      <Container fluid>
        <Container className="membershipFormStyle">
          <h2>Membership Details</h2>
          <Form>
            <Row>
              {/* First Name Form Group */}
              <Col>
                <Form.Group controlId="memberFormGroupFirstName">
                  <Form.Label>First Name*</Form.Label>
                  <Form.Control type="text" placeholder="First Name" />
                </Form.Group>
              </Col>
              {/* Last Name Form Group */}
              <Col>
                <Form.Group controlId="memberFormGroupLastName">
                  <Form.Label>Last Name*</Form.Label>
                  <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/* Email Address Form Group */}
              <Col>
                <Form.Group controlId="memberFormGroupEmail">
                  <Form.Label>Email Address*</Form.Label>
                  <Form.Control type="text" placeholder="Email" />
                </Form.Group>
              </Col>
              {/* Phone Number Form Group */}
              <Col>
                <Form.Group controlId="memberFormGroupPhone">
                  <Form.Label>Phone Number*</Form.Label>
                  <Form.Control type="number" placeholder="Phone" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/* Account Username Form Group */}
              <Col>
                <Form.Group controlId="memberFormGroupUsername">
                  <Form.Label>Account Username*</Form.Label>
                  <Form.Control type="text" placeholder="Your Username" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/* Account Password Form Group */}
              <Col>
                <Form.Group controlId="memberFormGroupPassword">
                  <Form.Label>Create Account Password*</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/* Confirm Password Form Group */}
              <Col>
                <Form.Group controlId="memberFormGroupConfirmPassword">
                  <Form.Label>Confirm Password*</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>
        <Container className="totalCostContainer">
          <Row>
            <Col>
              <h2>Your Order</h2>
              <hr size="50" />
              <Row>
                <Col sm={3}>
                  <span className="orderFormSection">Membership</span>
                </Col>
                <Col sm={9}>
                  <span className="orderDataSection" id="orderMembership">
                    Standard Membership
                  </span>
                </Col>
              </Row>
              <hr size="50" />
              <Row>
                <Col sm={3}>
                  <span className="orderFormSection">Total</span>
                </Col>
                <Col sm={9}>
                  <span className="orderDataSection" id="orderTotal">
                    $0000 / year
                  </span>
                </Col>
              </Row>
              <hr size="50" />
              <Row>
                <Col sm={3}>
                  <span className="orderFormSection">Recurring Totals</span>
                </Col>
                <Col sm={9}>
                  <span className="orderDataSection" id="orderRecurringTotal">
                    $0000 (Includes $22.35 GST)/year (renewal: July 23, 2019)
                  </span>
                </Col>
              </Row>
              <hr size="50" />
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default MembershipForm;
