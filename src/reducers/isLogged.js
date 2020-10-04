const userReducer = (
  state = {
    user: {},
    isLoggedIn: false,
  },
  action
) => {
  let newState = {};
  switch (action.type) {
    case "SIGN_IN":
      newState = { ...state, user: action.user, isLoggedIn: true };
      return newState;

    case "SIGN_OUT":
      newState = { ...state, user: {}, isLoggedIn: false };
      return newState;

    default:
      return state;
  }
};

export default userReducer;
