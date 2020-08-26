import React from "react";
import LoginForm from "../register-login-components/LoginForm";
import { pageTransition } from "../../transitions/Transitions";
import { motion } from "framer-motion";

const LoginPage = () => {
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
};

export default LoginPage;
