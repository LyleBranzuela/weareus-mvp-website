import React from "react";
import SearchField from "../search-components/SearchField";
import TherapyList from "../search-components/TherapyList";
import CallToAction from "../homepage-components/CallToAction";

class SearchPage extends React.Component {
  render() {
    return (
      <div className="searchPage">
        <SearchField />
        <TherapyList />
        <CallToAction />
      </div>
    );
  }
}

export default SearchPage;
