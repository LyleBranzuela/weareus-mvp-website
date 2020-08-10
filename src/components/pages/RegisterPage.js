import React from "react";
import ChooseRegister from "../register-login-components/ChooseRegister";
import PractitionerRegister from "../register-login-components/PractitionerRegister";
import UserRegister from "../register-login-components/UserRegister";
import { pageTransition } from "../App";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { motion } from "framer-motion";

const RegisterPage = () => {
  let { path } = useRouteMatch();
  return (
    <motion.div intial="out" animate="in" exit="out" variants={pageTransition}>
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
    </motion.div>
  );
};

export default RegisterPage;
