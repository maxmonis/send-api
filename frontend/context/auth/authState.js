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
      dispatch({ type: 'REGISTER_USER', payload: res.data.msg });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAIL', payload: error.response.data.msg });
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
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
