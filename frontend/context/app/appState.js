import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import client from '../../config/axios';

const AppState = ({ children }) => {
  const initialState = {
    message: null,
    original_name: '',
    name: '',
    loading: false,
  };
  const [state, dispatch] = useReducer(appReducer, initialState);
  const showAlert = (message) => {
    dispatch({ type: 'SHOW_ALERT', payload: message });
  };
  setTimeout(() => {
    dispatch({ type: 'HIDE_ALERT' });
  }, 3000);
  const uploadFile = async (formData, fileName) => {
    dispatch({ type: 'BEGIN_UPLOAD' });
    try {
      const { data } = await client.post('/api/files', formData);
      dispatch({
        type: 'UPLOAD_SUCCESS',
        payload: { name: data.file, original_name: fileName },
      });
    } catch (error) {
      dispatch({ type: 'UPLOAD_FAIL', payload: error.response.data.msg });
    }
    setTimeout(() => {
      dispatch({ type: 'HIDE_ALERT' });
    }, 3000);
  };
  const { message, original_name, name, loading } = state;
  return (
    <appContext.Provider
      value={{ message, original_name, name, loading, showAlert, uploadFile }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
