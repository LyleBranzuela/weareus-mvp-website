import React from "react";
import LoginForm from "../register-login-components/LoginForm";
import { pageTransition } from "../App";
import { motion } from "framer-motion";

class LoginPage extends React.Component {
  render() {
    return (
      <motion.div
        intial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
      >
        <LoginForm />
      </motion.div>
    );
  }
}

export default LoginPage;
