import React from "react";
import { AnimatePresence } from "framer-motion";
import NavigationBar from "./general-components/NavigationBar";
import Footer from "./general-components/Footer";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import ForPractitionersPage from "./pages/ForPractitionersPage";
import PractitionerListPage from "./pages/PractitionerListPage";
import PractitionerProfile from "./pages/PractitionerProfile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PractitionerRegister from "./register-login-components/PractitionerRegister";
import MembershipForm from "./register-login-components/MembershipForm";
import ContactUsPage from "./pages/ContactUsPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

function App() {
  // Returns the location object that represents the current URL
  const location = useLocation();
  return (
    <div>
      <NavigationBar />
      {/* Single Page Website Routings (AnimatePresence for Transition Animations)*/}
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          {/* General Pages */}
          <Route path="/home" component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/about" component={AboutPage} />
          <Route
            exact
            path="/terms-and-conditions"
            component={TermsAndConditionsPage}
          />
          <Route path="/contact-us" component={ContactUsPage} />

          {/* Register-Login Pages */}
          <Route path="/login" component={LoginPage} />
          <Route path="/membership-form" component={MembershipForm} />
          <Route path="/register" component={RegisterPage} />

          {/* Practitioner Related Pages */}
          <Route path="/for-practitioner" component={ForPractitionersPage} />
          <Route path="/practitioner-list" component={PractitionerListPage} />
          <Route path="/practitioner-profile" component={PractitionerProfile} />
          <Route exact path={["/index.html", "/"]}>
            <Redirect to="/home" />
          </Route>
        </Switch>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
export default App;
