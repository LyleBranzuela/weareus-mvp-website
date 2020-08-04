import React from "react";
import NavigationBar from "./general-components/NavigationBar";
import Footer from "./general-components/Footer";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import ForPractitionersPage from "./pages/ForPractitionersPage";
import PractitionerListPage from "./pages/PractitionerListPage";
import LoginPage from "./pages/LoginPage";
import UserRegisterPage from "./pages/UserRegisterPage";
import PractitionerRegisterPage from "./pages/PractitionerRegisterPage";
import ContactUsPage from "./pages/ContactUsPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PractitionerProfile from "./pages/PractitionerProfile";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavigationBar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/index" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/for-practitioner" component={ForPractitionersPage} /> 
            <Route path="/practitioner-list" component={PractitionerListPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register-practitioner" component={PractitionerRegisterPage} />
            <Route path="/register-user" component={UserRegisterPage} />
            <Route path="/contact-us" component={ContactUsPage} />
            <Route path="/practitioner-profile" component={PractitionerProfile}/>
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
