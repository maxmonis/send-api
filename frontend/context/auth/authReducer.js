const AuthReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'REGISTER_USER':
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
      return {
        ...state,
        message: payload,
      };
    case 'LOGIN_USER': {
      localStorage.setItem('token', payload);
      return {
        ...state,
        token: payload,
        authenticated: true,
      };
    }
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
