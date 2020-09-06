const AuthReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'REGISTER_USER':
      console.log('REGISTER_USER');
    default:
      return state;
  }
};

export default AuthReducer;
