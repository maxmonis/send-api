import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

const AuthState = ({ children }) => {
  const initialState = {
    token: null,
    authenticated: null,
    user: null,
    message: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  const registerUser = (data) => {
    dispatch({ type: 'REGISTER_USER', payload: data });
  };
  const { token, authenticated, user, message } = state;
  return (
    <authContext.Provider
      value={{
        token,
        authenticated,
        user,
        message,
        registerUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
