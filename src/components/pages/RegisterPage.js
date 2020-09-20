import React from "react";
import ChooseRegister from "../register-login-components/ChooseRegister";
import { pageTransition } from "../../transitions/Transitions";
import { motion } from "framer-motion";

const RegisterPage = () => {
  return (
    <motion.div intial="out" animate="in" exit="out" variants={pageTransition}>
      <ChooseRegister />
    </motion.div>
  );
};

export default RegisterPage;
