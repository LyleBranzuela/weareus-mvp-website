import React from "react";
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
      {/* Single Page Website Routings (AnimatePresence for Transition Animations)*/}
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          {/* General Pages */}
          <Route exact path={["/index.html", "/"]}>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/about" component={AboutPage} />
          <Route
            path="/terms-and-conditions"
            component={TermsAndConditionsPage}
          />
          <Route path="/contact-us" component={ContactUsPage} />

          {/* Register-Login Pages */}
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/membership-form" component={MembershipForm} />

          {/* Practitioner Related Pages */}
          <Route path="/for-practitioner" component={ForPractitionersPage} />
          <Route path="/practitioner-list" component={PractitionerListPage} />
          <Route
            path="/practitioner-profile"
            component={PractitionerProfile}
          ></Route>
        </Switch>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
export default App;

// Temporary Services List
export const servicesList = {
  placeholderList: [
    "Acupressure",
    "Acupuncture",
    "Access Bars",
    "Alternative therapies",
    "Alexander technique",
    "Aqua healing / Aquarian Healing",
    "Aromatherapy",
    "Art Therapy",
    "Astrology",
    "Aura-soma",
    "Aura readers",
    "Ayurveda",
    "Bach flower therapy",
    "Biofeedback Analysis",
    "Biochemistry",
    "Bodywork",
    "Body Talk System",
    "Bowan Therapy",
    "Brennan Healing Science Breathwork",
    "Brain Gym",
    "Clean Eating",
    "Bio-Energetic Therapy",
    "Chakra Rebalancing",
    "Channelling",
    "Chiropractor",
    "Clairvoyance",
    "Crystal Healing",
    "Colon Hydrotherapy",
    "Colour Healing",
  ],
};
