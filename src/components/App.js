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
import UserRegister from "./register-login-components/UserRegister";
import ProfileSetup from "./register-login-components/ProfileSetup";
import MembershipForm from "./register-login-components/MembershipForm";
import ContactUsPage from "./pages/ContactUsPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { Account } from "../manage-accounts/Accounts";

function App() {
  // Returns the location object that represents the current URL
  const location = useLocation();
  return (
    <Account>
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
          <Route
            path="/practitioner-profile"
            component={PractitionerProfile}
          ></Route>
        </Switch>
      </AnimatePresence>
      <Footer />
    </Account>
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
