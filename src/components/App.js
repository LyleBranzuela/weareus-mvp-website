import React from "react";
import NavigationBar from "./general-components/NavigationBar";
import Footer from "./general-components/Footer";
import ScrollToTop from "./general-components/ScrollToTop";
import Error404Page from "./general-components/Error404Page";
import Error500Page from "./general-components/Error500Page";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import SearchResults from "./search-components/SearchResults";
import AboutPage from "./pages/AboutPage";
import ForPractitionersPage from "./pages/ForPractitionersPage";
import PractitionerListPage from "./pages/PractitionerListPage";
import PractitionerProfile from "./pages/PractitionerProfile";
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

  // 
  const DefaultPages = () => (
    <div>
      {/* Scrolls To The Top Everytime they navigate through the routes */}
      <NavigationBar />
      {/* Single Page Website Routings (AnimatePresence for Transition Animations)*/}
      <Switch location={location} key={location.pathname}>
        {/* General Pages */}
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

        <Route path="/practitioner-list" component={PractitionerListPage} />
        <Route path="/practitioner-profile" component={PractitionerProfile} />
        <Route exact path={["/index.html", "/"]}>
          <Redirect to="/home" />
        </Route>
        <Route path="*" component={Error404Page} />
        <Route path="/500" component={Error500Page} />
      </Switch>
      {/* </AnimatePresence> */}
    </div>
  )
  
  // Pages that requires a different navbar or no navbar at all
  const NoNavPages = () => (
    <div>
      <Switch location={location} key={location.pathname}>
        <Route path="/home" component={HomePage} />
        <Route path="/for-practitioner" component={ForPractitionersPage} />
        <Route component={DefaultPages} />
      </Switch>
    </div>
  )

  return (
    <ScrollToTop>
      <Route>
        <Switch location={location} key={location.pathname}>
          <Route component={NoNavPages} />
          <Route component={DefaultPages} />
        </Switch>
      </Route>
      <Footer />
    </ScrollToTop>
  );

}
export default App;
