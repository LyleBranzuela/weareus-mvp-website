import React from "react";
import Navbar from "./NavBar";
import PageHeader from "./PageHeader";
import CallToAction from "./Footer";
import Footer from "./Footer";

class App extends React.Component {
  render() {
    return (
      <Container>
        <Navbar />
        <PageHeader />
        <CallToAction />
        <Footer />
      </Container>
    );
  }
}

export default App;
