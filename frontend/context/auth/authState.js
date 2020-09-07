import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import client from '../../config/axios';

const AuthState = ({ children }) => {
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    authenticated: null,
    user: null,
    message: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  const registerUser = async (values) => {
    try {
      const { data } = await client.post('/api/users', values);
      dispatch({ type: 'REGISTER_USER', payload: data.msg });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAIL', payload: error.response.data.msg });
    }
    setTimeout(() => {
      dispatch({ type: 'CLEAR_ALERTS' });
    }, 3000);
  };
  const logUserIn = async (values) => {
    try {
      const { data } = await client.post('/api/auth', values);
      dispatch({ type: 'LOGIN_USER', payload: data });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.msg });
    }
    setTimeout(() => {
      dispatch({ type: 'CLEAR_ALERTS' });
    }, 3000);
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
        logUserIn,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
