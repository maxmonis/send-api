import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import client from '../../config/axios';
import Token from '../../config/token';

const AuthState = ({ children }) => {
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
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
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      Token(token);
    }
    try {
      const { data } = await client.get('/api/auth');
      if (data.user) {
        dispatch({ type: 'USER_LOADED', payload: data.user });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.msg });
    }
  };
  const logOut = () => {
    dispatch({ type: 'LOG_OUT' });
  };
  const { token, user, message } = state;
  return (
    <authContext.Provider
      value={{
        token,
        user,
        message,
        registerUser,
        logUserIn,
        loadUser,
        logOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
