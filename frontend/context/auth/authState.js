import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import client from '../../config/axios';
import Token from '../../config/token';

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
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      Token(token);
    }
    try {
      const { data } = await client.get('api/auth');
      dispatch({ type: 'USER_LOADED', payload: data.user });
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
        logUserIn,
        loadUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
