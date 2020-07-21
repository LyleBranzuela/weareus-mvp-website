import React from "react";
import NavigationBar from "./general-components/NavigationBar";
import Footer from "./general-components/Footer";
import CallToAction from "./general-components/CallToAction";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import PractitionerListPage from "./pages/PractitionerListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavigationBar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/practitioner" component={PractitionerListPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </Switch>
          {/* <CallToAction /> */}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
