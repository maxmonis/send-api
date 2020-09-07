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
    case 'USER_LOADED':
      return { ...state, user: payload };
    case 'LOG_OUT': {
      localStorage.removeItem('token');
      return { ...state, user: null, token: null, authenticated: null };
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
