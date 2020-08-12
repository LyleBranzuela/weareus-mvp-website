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
import MembershipForm from "./register-login-components/MembershipForm";
import ContactUsPage from "./pages/ContactUsPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import { AnimatePresence } from "framer-motion";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <NavigationBar />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
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
          <Route path="/membership-form" component={MembershipForm} />
          <Route path="/contact-us" component={ContactUsPage} />
          <Route
            path="/terms-and-conditions"
            component={TermsAndConditionsPage}
          />
        </Switch>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
export default App;

// Animation Variantions
export const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};
