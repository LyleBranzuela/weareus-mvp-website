import "./SearchField.css";
import React from "react";
import {
  Container,
  InputGroup,
  Dropdown,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import CustomButton from "../general-components/CustomButton";

class SearchField extends React.Component {
  render() {
    // Map the dropdown items of Region
    let regionKeywords = [];
    let regions = this.props.regions;
    if (regions) {
      regionKeywords = regions.map((region) => {
        return <Dropdown.Item key={region}>{region}</Dropdown.Item>;
      });
    }

    // Map the dropdown items of Services
    let serviceKeywords = [];
    let services = this.props.services;
    if (services) {
      serviceKeywords = services.map((service) => {
        return <Dropdown.Item key={service}>{service}</Dropdown.Item>;
      });
    }

    return (
      <Container fluid className="searchFieldContainer">
        <Container>
          <Form className="searchFieldStyle">
            <Row>
              <Col>
                <h3>Search Practitioners</h3>
              </Col>
            </Row>
            <Row className="rowSearchFieldStyle">
              <Col sm={4}>
                {/** Search Practitioners Through Text Section */}
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
              <Col sm={3}>
                {/** Dropdown Search by Therapy Type */}
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
                  <Dropdown.Menu>{serviceKeywords}</Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm={3}>
                {/** Dropdown Search by Region */}
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
                  <Dropdown.Menu>{regionKeywords}</Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm={2}>
                {/** Search Button */}
                <CustomButton
                  id="searchFieldButton"
                  type="submit"
                  text="Search"
                />
              </Col>
            </Row>
          </Form>
        </Container>
      </Container>
    );
  }
}

export default SearchField;
