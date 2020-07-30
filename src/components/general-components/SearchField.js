import "./SearchField.css";
import React from "react";
import {
  Container,
  InputGroup,
  Dropdown,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";

class SearchField extends React.Component {
  render() {
    return (
      <Container>
        <Form className="searchFieldStyle">
          <Row className="rowSearchFieldStyle">
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="searchFieldIcon">
                    <img
                      alt="search icon"
                      src={require("../../assets/icons/search_icon.svg")}
                    />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control placeholder="Search Practitioners"></Form.Control>
              </InputGroup>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle id="therapyTypeButton">
                  <h6>
                    Therapy Type
                    <img
                      alt="Therapy Type Accordion Arrow"
                      src={require("../../assets/icons/menu_arrow_white.svg")}
                    />
                  </h6>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    Abdominal Massage
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Acupressure</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Acupuncture</Dropdown.Item>
                  <Dropdown.Item href="#/action-4">
                    Allergy Intolerance
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-5">
                    Ayurvedic Massage Therapy
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-6">
                    Ayurvedic Medicine
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-7">Biodynamic</Dropdown.Item>
                  <Dropdown.Item href="#/action-8">Biofeedback</Dropdown.Item>
                  <Dropdown.Item href="#/action-9">Biomagnetic</Dropdown.Item>
                  <Dropdown.Item href="#/action-10">
                    Bioptron Light Therapy
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle id="regionButton">
                  <h6>
                    Region
                    <img
                      alt="Region Accordion Arrow"
                      src={require("../../assets/icons/menu_arrow_white.svg")}
                    />
                  </h6>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Auckland</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Wellington</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Button id="searchFieldButton" variant="primary" type="submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default SearchField;
