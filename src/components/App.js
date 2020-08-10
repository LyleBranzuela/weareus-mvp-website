import React from "react";
import NavigationBar from "./general-components/NavigationBar";
import Footer from "./general-components/Footer";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import ForPractitionersPage from "./pages/ForPractitionersPage";
import PractitionerListPage from "./pages/PractitionerListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactUsPage from "./pages/ContactUsPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavigationBar />
          <Switch>
            <Route exact path={["/index.html", "/"]}>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/for-practitioner" component={ForPractitionersPage} />
            <Route path="/practitioner-list" component={PractitionerListPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/contact-us" component={ContactUsPage} />
            <Route
              path="/terms-and-conditions"
              component={TermsAndConditionsPage}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
