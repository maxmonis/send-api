import { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import client from '../../config/axios';
import Token from '../../config/token';

const AuthState = ({ children }) => {
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    user: null,
    message: null,
    authenticated: false,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { token, user, message, authenticated } = state;
  const registerUser = async (values) => {
    try {
      const { data } = await client.post('/users', values);
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
      const { data } = await client.post('/auth', values);
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
      const { data } = await client.get('/auth');
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
  return (
    <authContext.Provider
      value={{
        token,
        user,
        message,
        authenticated,
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
