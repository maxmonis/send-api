const AuthReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'REGISTER_USER':
    case 'REGISTER_FAIL':
      return {
        ...state,
        message: payload,
      };
    case 'CLEAR_ALERTS':
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
