import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import NavigationBar from "./general-components/NavigationBar";
import Footer from "./general-components/Footer";
import ScrollToTop from "./general-components/ScrollToTop";
import Error404Page from "./general-components/Error404Page";
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
import EditProfile from "./register-login-components/EditProfile";
import ContactUsPage from "./pages/ContactUsPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
// import Error500Page from "./general-components/Error500Page";
// import PracticeProfile from "./pages/PracticeProfilePage";

function App() {
  // Returns the location object that represents the current URL
  const location = useLocation();
  let isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  let user_information = useSelector(
    (state) => state.userReducer.user_information
  );

  // All The Default Pages
  const DefaultPages = () => (
    <div>
      {/* Scrolls To The Top Everytime they navigate through the routes */}
      <NavigationBar />
      {/* Single Page Website Routings */}
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

        {/* Practitioner Related Pages */}
        <Route path="/practitioner-list" component={PractitionerListPage} />
        <Route
          path="/practitioner-profile/:company_id"
          component={PractitionerProfile}
        />
        <Route exact path={["/index.html", "/"]}>
          <Redirect to="/home" />
        </Route>

        {/* Register-Login Pages */}
        <Route
          path="/login"
          render={(props) =>
            !isLoggedIn ? <LoginPage {...props} /> : <Redirect to="/home" />
          }
        />
        <Route
          path="/register"
          render={(props) =>
            !isLoggedIn ? <RegisterPage {...props} /> : <Redirect to="/home" />
          }
        />
        <Route
          path="/register-user"
          render={(props) =>
            !isLoggedIn ? <UserRegister {...props} /> : <Redirect to="/home" />
          }
        />
        <Route
          path="/register-practitioner"
          render={(props) =>
            !isLoggedIn ||
            (isLoggedIn && user_information.user_type === "user") ||
            (isLoggedIn && !user_information.hasActiveSubscription) ? (
              <PractitionerRegister {...props} />
            ) : (
              <Redirect to="/home" />
            )
          }
        />
        <Route
          path="/membership-form"
          render={(props) =>
            !isLoggedIn ||
            (isLoggedIn && user_information.user_type === "user") ||
            (isLoggedIn && !user_information.hasActiveSubscription) ? (
              <MembershipForm {...props} />
            ) : (
              <Redirect to="/home" />
            )
          }
        />
        <Route
          path="/profile-setup"
          render={(props) =>
            isLoggedIn &&
            user_information.user_type === "practitioner" &&
            user_information.hasActiveSubscription ? (
              <ProfileSetup {...props} />
            ) : (
              <Redirect to="/home" />
            )
          }
        />
        <Route
          path="/edit-profile"
          render={(props) =>
            (isLoggedIn &&
              user_information.company_id &&
              user_information.user_type === "practitioner") ||
            (isLoggedIn && user_information.user_type === "admin") ? (
              <EditProfile {...props} />
            ) : (
              <Redirect to="/home" />
            )
          }
        />
        {/*
        <Route
          path="/finances"
          render={(props) =>
            isLoggedIn && user_information.user_type === "practitioner" ? (
              <FinancesPage {...props} />
            ) : (
              <Redirect to="/home" />
            )
          }
        /> */}
      </Switch>
    </div>
  );

  // Pages that requires a different navbar or no navbar at all
  const NoNavPages = () => (
    <div>
      <Switch location={location} key={location.pathname}>
        <Route path="/home" component={HomePage} />
        <Route path="/for-practitioner" component={ForPractitionersPage} />
        <Route component={DefaultPages} />
      </Switch>
    </div>
  );

  return (
    <ScrollToTop>
      <Route>
        <Switch location={location} key={location.pathname}>
          <Route component={NoNavPages} />
          <Route component={DefaultPages} />
          <Route path="" component={Error404Page} />
        </Switch>
      </Route>
      <Footer />
    </ScrollToTop>
  );
}

export default App;
