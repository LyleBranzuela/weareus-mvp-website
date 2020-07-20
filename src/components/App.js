import React from "react";
import NavigationBar from "./general-components/NavigationBar";
import PageHeader from "./general-components/PageHeader";
import MessageOfTheDay from "./general-components/MessageOfTheDay";
// import CallToAction from "./general-components/Footer";
// import Footer from "./general-components/Footer";
// import Container from "react-bootstrap/Container";

class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <PageHeader />
        <MessageOfTheDay />
        {/*  <CallToAction /> 
        <Footer /> */}
      </div>
    );
  }
}

export default App;
