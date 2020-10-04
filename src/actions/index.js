export const signin = (user) => {
  return {
    type: "SIGN_IN",
    user,
  };
};

export const signout = () => {
  return {
    type: "SIGN_OUT",
  };
};
