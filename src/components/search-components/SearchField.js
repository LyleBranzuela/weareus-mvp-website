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
import { Link } from "react-router-dom";
import api from "../../api/api";

class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      searchPractitionerName: this.props.searchPractitionerName
        ? this.props.searchPractitionerName
        : "",
      searchService: this.props.searchService ? this.props.searchService : "",
      searchRegion: this.props.searchRegion ? this.props.searchRegion : "",
      services: [],
      regions: [],
      width: window.innerWidth,
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  // Function to Set the Search Keywords or Terms
  setSearchKeywords = async () => {
    // Getting the Services and Regions JSON From the Server
    const serviceResponse = await api.get("/lookup_services");
    const regionResponse = await api.get("/regions");

    // Setting the Services and Regions States
    this._isMounted &&
      this.setState({
        services: serviceResponse.data.rows.map(
          (service) => service.service_name
        ),
        regions: regionResponse.data.rows.map((region) => region.region_name),
      });
  };

  // Handles Any Active Changes on the Form
  formOnChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // Handles On Dropdown Forms (Takes in a string called state to identify which state to change)
  formOnSelectHandler = (e, state) => {
    this.setState({
      [state]: e,
    });
  };

  // Query a Search from the Database
  onSearchSubmit = (event) => {
    event.preventDefault();
    // Setting the Redirection State
    this.setState({ redirect: true });
  };

  componentDidMount() {
    this._isMounted = true;
    this.setState({ redirect: false });
    this._isMounted && this.setSearchKeywords();
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ redirect: false });
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  render() {
    // Map the dropdown items of Region
    let regionKeywords = [];
    if (this.state.regions) {
      regionKeywords = this.state.regions.map((region) => {
        return (
          <Dropdown.Item eventKey={region} key={region}>
            {region}
          </Dropdown.Item>
        );
      });
    }

    // Map the dropdown items of Services
    let serviceKeywords = [];
    if (this.state.services) {
      serviceKeywords = this.state.services.map((service) => {
        return (
          <Dropdown.Item eventKey={service} key={service}>
            {service}
          </Dropdown.Item>
        );
      });
    }

    const { width } = this.state;
    const isMobile = width <= 600;
    if (isMobile) {
      // Mobile version
      return (
        <Container fluid className="searchFieldContainerMobile">
          <Container>
            <Form
              className="searchFieldStyleMobile"
              onSubmit={this.onSearchSubmit}
            >
              <Row className="rowSearchFieldStyle">
                <Col sm={4}>
                  {/** Search Practitioners Through Text Section */}
                  <Form.Group controlId="searchPractitionerName">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="searchFieldIconMobile">
                          <img
                            alt="search icon"
                            src={require("../../assets/icons/search_icon.svg")}
                          />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        value={this.state.searchPractitionerName}
                        onChange={this.formOnChangeHandler}
                        id="searchFieldBoxMobile"
                        placeholder="Search Practitioners"
                      ></Form.Control>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  {/** Dropdown Search by Therapy Type */}
                  <Dropdown
                    onSelect={(e) =>
                      this.formOnSelectHandler(e, "searchService")
                    }
                    className="searchFieldDropMobile"
                  >
                    <Dropdown.Toggle id="therapyTypeButtonMobile">
                      <h6>
                        {this.state.searchService
                          ? this.state.searchService
                          : "Therapy Type"}
                      </h6>
                      <img
                        alt="Therapy Type Accordion Arrow"
                        src={require("../../assets/icons/menu_arrow_white.svg")}
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        eventKey={"Any Therapy Type"}
                        key={"Any Therapy Type"}
                      >
                        Any Therapy Type
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      {/** Generate Service Dropdown Items */}
                      {serviceKeywords}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col sm={3}>
                  {/** Dropdown Search by Region */}
                  <Dropdown
                    onSelect={(e) =>
                      this.formOnSelectHandler(e, "searchRegion")
                    }
                    className="searchFieldDropMobile"
                  >
                    <Dropdown.Toggle id="regionButtonMobile">
                      <h6>
                        {this.state.searchRegion
                          ? this.state.searchRegion
                          : "Region"}
                      </h6>
                      <img
                        alt="Region Accordion Arrow"
                        src={require("../../assets/icons/menu_arrow_white.svg")}
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey={"Any Region"} key={"Any Region"}>
                        Any Region
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      {/** Generate Region Dropdown Items */}
                      {regionKeywords}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col sm={2}>
                  {/** Search Button */}
                  <Link
                    to={{
                      pathname: "/results",
                      search: `?company_name=${this.state.searchPractitionerName}&service_name=${this.state.searchService}&region_name=${this.state.searchRegion}`,
                    }}
                  >
                    <CustomButton
                      id="searchFieldButtonMobile"
                      type="submit"
                      text="Search"
                    />
                  </Link>
                </Col>
              </Row>
            </Form>
          </Container>
        </Container>
      );
    }
    return (
      <Container fluid className="searchFieldContainer">
        <Container>
          <Form className="searchFieldStyle" onSubmit={this.onSearchSubmit}>
            <Row>
              <Col>
                <h3>Search Practitioners</h3>
              </Col>
            </Row>
            <Row className="rowSearchFieldStyle">
              <Col sm={4}>
                {/** Search Practitioners Through Text Section */}
                <Form.Group controlId="searchPractitionerName">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="searchFieldIcon">
                        <img
                          alt="search icon"
                          src={require("../../assets/icons/search_icon.svg")}
                        />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      value={this.state.searchPractitionerName}
                      onChange={this.formOnChangeHandler}
                      placeholder="Search Practitioners"
                    ></Form.Control>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col sm={3}>
                {/** Dropdown Search by Therapy Type */}
                <Dropdown
                  onSelect={(e) => this.formOnSelectHandler(e, "searchService")}
                >
                  <Dropdown.Toggle id="therapyTypeButton">
                    <h6>
                      {this.state.searchService
                        ? this.state.searchService
                        : "Therapy Type"}
                    </h6>
                    <img
                      alt="Therapy Type Accordion Arrow"
                      src={require("../../assets/icons/menu_arrow_white.svg")}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      eventKey={"Any Therapy Type"}
                      key={"Any Therapy Type"}
                    >
                      Any Therapy Type
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {/** Generate Service Dropdown Items */}
                    {serviceKeywords}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm={3}>
                {/** Dropdown Search by Region */}
                <Dropdown
                  onSelect={(e) => this.formOnSelectHandler(e, "searchRegion")}
                >
                  <Dropdown.Toggle id="regionButton">
                    <h6>
                      {this.state.searchRegion
                        ? this.state.searchRegion
                        : "Region"}
                    </h6>
                    <img
                      alt="Region Accordion Arrow"
                      src={require("../../assets/icons/menu_arrow_white.svg")}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey={"Any Region"} key={"Any Region"}>
                      Any Region
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {/** Generate Region Dropdown Items */}
                    {regionKeywords}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm={2}>
                {/** Search Button */}
                <Link
                  to={{
                    pathname: "/results",
                    search: `?company_name=${this.state.searchPractitionerName}&service_name=${this.state.searchService}&region_name=${this.state.searchRegion}`,
                  }}
                >
                  <CustomButton
                    id="searchFieldButton"
                    type="submit"
                    text="Search"
                  />
                </Link>
              </Col>
            </Row>
          </Form>
        </Container>
      </Container>
    );
  }
}

export default SearchField;
