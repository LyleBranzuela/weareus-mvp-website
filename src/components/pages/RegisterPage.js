import React from "react";
import ChooseRegister from "../register-login-components/ChooseRegister";
import PractitionerRegister from "../register-login-components/PractitionerRegister";
import UserRegister from "../register-login-components/UserRegister";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const RegisterPage = () => {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <ChooseRegister />
        </Route>
        <Route path={`${path}/user-practitioner`} component={UserRegister} />
        <Route
          path={`${path}/register-practitioner`}
          component={PractitionerRegister}
        />
      </Switch>
    </div>
  );
};

export default RegisterPage;
