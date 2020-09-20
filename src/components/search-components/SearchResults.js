import "./SearchResults.css";
import React from "react";
import SearchField from "./SearchField";
import CallToAction from "../homepage-components/CallToAction";
import { Container, Col, Row } from "react-bootstrap";
import queryString from "query-string";
import api from "../../api/api";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Search Keywords are for front end purposes
      searchPractitionerName: "",
      searchService: "",
      searchRegion: "",
      searchResults: [],
    };

    // Prevents Memory Leaks
    this._isMounted = false;
  }

  displayResults = async (e) => {
    const params = await queryString.parse(this.props.location.search);

    // Setting the SearchResults State
    this._isMounted &&
      this.setState({
        searchPractitionerName: params.company_name,
        searchService: params.service_name,
        searchRegion: params.region_name,
      });

    // If it's empty then clear it out for the database search
    if (params.company_name === "") {
      this.setState({
        searchPractitionerName: "Any Practitioners",
      });
      params.company_name = "";
    }
    if (
      params.service_name === "Any Therapy Type" ||
      params.service_name === ""
    ) {
      this.setState({
        searchService: "Any Therapy Type",
      });
      params.service_name = "";
    }
    if (params.region_name === "Any Region" || params.region_name === "") {
      this.setState({
        searchRegion: "Any Region",
      });
      params.region_name = "";
    }

    // Getting the Services and Regions JSON From the Server
    const searchResponse = await api.get("/search-practitioner/", {
      params: {
        company_name: params.company_name,
        service_name: params.service_name,
        region_name: params.region_name,
      },
    });

    // Setting the SearchResults State
    this._isMounted &&
      this.setState({
        searchResults: searchResponse.data.rows,
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.displayResults();
  }

  // Update Search whenever the URL is changed
  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.displayResults();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    // Map all of the Practitioners
    let searchResultsList = [];
    let testString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut
    ex facilisis, faucibus erat et, faucibus sem. Cras tempus quam
    quis risus interdum, sit amet accumsan felis lacinia.
    Suspendisse eget venenatis erat, et ornare velit. Proin id
    viverra neque. Suspendisse potenti. Vivamus vitae dolor
    tristique, egestas est eleifend, laoreet mauris. Suspendisse
    semper ligula eleifend varius pharetra. Integer vel tristique
    nisi, vitae rhoncus augue. Curabitur at pharetra tortor.
    Mauris elementum eleifend urna eu commodo. Vestibulum erat
    quam, efficitur id tortor vel, sollicitudin viverra mauris.
    Integer aliquet convallis diam, ultrices suscipit nisi
    placerat sed. Integer lobortis urna eu nisi cursus, sit amet
    accumsan neque tristique. Fusce tincidunt metus id placerat
    congue. Praesent pretium augue eu vehicula dignissim.`;
    if (this.state.searchResults) {
      searchResultsList = this.state.searchResults.map((practitioner) => {
        // Temporary Image URL until S3 is setup
        let image_url = "listing_placeholder_2.jpg";
        if (!image_url) {
          image_url = "listing_placeholder_2.jpg";
        }
        return (
          <div key={practitioner.company_name}>
            <hr />
            <Row className="pracResultStyle">
              <Col className="pracResultImage" sm={3}>
                <img
                  alt={practitioner.company_name}
                  variant="top"
                  src={require("../../assets/images/placeholders/" + image_url)}
                />
              </Col>
              <Col className="pracResultDetails" sm={6}>
                <h4>{practitioner.company_name}</h4>
                <h6>{`${practitioner.suburb}, ${practitioner.region_name}`}</h6>
                {/* <p>{practitioner.about}</p> */}
                <p className="pracResultAbout">
                  {testString.slice(0, 190)}
                  <span>...More</span>
                </p>
              </Col>
              <Col className="pracResultMoreDetails" sm={3}>
                <span>
                  <strong>Address:</strong>{" "}
                  {`${practitioner.building_number}, ${practitioner.street},`}
                  <br />
                  {`${practitioner.suburb}, ${practitioner.region_name} ${practitioner.postal_code}`}
                </span>
                <br />
                <br />
                <span>
                  <strong>Phone:</strong> {practitioner.phone}
                </span>
                <br />
                <span className="searchPhone">{practitioner.email}</span>
              </Col>
            </Row>
          </div>
        );
      });
    }
    // console.log(this.props.location.state.regions);
    return (
      <div>
        <SearchField />
        <Container className="searchResultsStyle">
          <span id="searchKeyTerms">
            Search Result:{" "}
            <span>
              {this.state.searchPractitionerName} - {this.state.searchService} -{" "}
              {this.state.searchRegion}
            </span>
          </span>
          {searchResultsList}
        </Container>
        <CallToAction />
      </div>
    );
  }
}

export default SearchResults;
