import React from "react";
import NavigationBar from "./general-components/NavigationBar";
import Footer from "./general-components/Footer";
import ScrollToTop from "./general-components/ScrollToTop";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import SearchResults from "./search-components/SearchResults";
import AboutPage from "./pages/AboutPage";
import ForPractitionersPage from "./pages/ForPractitionersPage";
import PractitionerListPage from "./pages/PractitionerListPage";
import PractitionerProfile from "./pages/PractitionerProfile";
import TempPractitionerProfile from "./pages/TempPractitionerProfile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserRegister from "./register-login-components/UserRegister";
import PractitionerRegister from "./register-login-components/PractitionerRegister";
import MembershipForm from "./register-login-components/MembershipForm";
import ProfileSetup from "./register-login-components/ProfileSetup";
import ContactUsPage from "./pages/ContactUsPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

function App() {
  // Returns the location object that represents the current URL
  const location = useLocation();
  return (
    <div>
      {/* Scrolls To The Top Everytime they navigate through the routes */}
      <ScrollToTop>
        <NavigationBar />
        {/* Single Page Website Routings (AnimatePresence for Transition Animations)*/}
        <Switch location={location} key={location.pathname}>
          {/* General Pages */}
          <Route path="/home" component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/results" component={SearchResults} />
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
          <Route path="/register-user" component={UserRegister} />
          <Route
            path={`/register-practitioner`}
            component={PractitionerRegister}
          />
          <Route path={`/profile-setup`} component={ProfileSetup} />

          {/* Practitioner Related Pages */}
          <Route path="/for-practitioner" component={ForPractitionersPage} />
          <Route path="/practitioner-list" component={PractitionerListPage} />
          <Route path="/practitioner-profile" component={PractitionerProfile} />
          <Route path="/temp-prac-profile/:company_id" component={TempPractitionerProfile} />
          <Route exact path={["/index.html", "/"]}>
            <Redirect to="/home" />
          </Route>
        </Switch>
        {/* </AnimatePresence> */}
        <Footer />
      </ScrollToTop>
    </div>
  );
}
export default App;
