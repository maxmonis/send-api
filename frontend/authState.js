import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import client from '../../config/axios';

const AuthState = ({ children }) => {
  const initialState = {
    token: null,
    authenticated: null,
    user: null,
    message: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  const registerUser = async (data) => {
    try {
      const res = await client.post('/api/users', data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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
