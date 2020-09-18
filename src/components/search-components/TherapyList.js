import "./TherapyList.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../api/api";

class TherapyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  // Function to Set the Search Service Keywords
  setServiceKeywords = async () => {
    // Getting the Services JSON From the Server
    const serviceResponse = await api.get("/lookup_services");

    // Setting the Services State
    this._isMounted &&
      this.setState({
        services: serviceResponse.data.rows.map(
          (service) => service.service_name
        ),
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setServiceKeywords();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    /** Calculate how many items each of the 4 columns should have */
    let therapyList = this.state.services;
    let printColItemAmount = 0;
    // Map a list element with each item in the placeholder list
    let searchKeywords = [];
    if (therapyList) {
      printColItemAmount = Math.ceil(therapyList.length / 4);
      searchKeywords = therapyList.map((searchKeyword) => {
        return (
          <Link
            key={searchKeyword}
            to={{
              pathname: "/results",
              search: `?company_name=&service_name=${searchKeyword}&region_name=`,
            }}
          >
            <li>{searchKeyword}</li>
          </Link>
        );
      });
    }
    return (
      <Container className="therapyListStyle">
        <Row>
          <h4>Find a practitioner by therapy type</h4>
        </Row>
        <Row>
          {/* Loop Through Each Column's Modality, Slice is used so that portions that doesn't exist does not return an error */}
          <Col sm={3}>
            <ul>{searchKeywords.slice(0, printColItemAmount)}</ul>
          </Col>
          <Col sm={3}>
            <ul>
              {searchKeywords.slice(printColItemAmount, printColItemAmount * 2)}
            </ul>
          </Col>
          <Col sm={3}>
            <ul>
              {searchKeywords.slice(
                printColItemAmount * 2,
                printColItemAmount * 3
              )}
            </ul>
          </Col>
          <Col sm={3}>
            <ul>
              {searchKeywords.slice(printColItemAmount * 3, therapyList.length)}
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TherapyList;
