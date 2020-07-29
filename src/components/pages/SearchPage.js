import React from "react";
import SearchField from "../general-components/SearchField";
import CallToAction from "../homepage-components/CallToAction";

class SearchPage extends React.Component {
  render() {
    return (
      <div className="searchPage">
        <SearchField />
        <CallToAction />
      </div>
    );
  }
}

export default SearchPage;
