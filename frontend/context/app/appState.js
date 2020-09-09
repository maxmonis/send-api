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
    downloads: 1,
    password: '',
    author: null,
    url: '',
  };
  const [state, dispatch] = useReducer(appReducer, initialState);
  const {
    message,
    original_name,
    name,
    loading,
    downloads,
    password,
    author,
    url,
  } = state;
  const showAlert = (message) => {
    dispatch({ type: 'SHOW_ALERT', payload: message });
    setTimeout(() => {
      dispatch({ type: 'HIDE_ALERT' });
    }, 3000);
  };
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
  const createLink = async () => {
    const values = {
      name,
      original_name,
      downloads,
      password,
      author,
    };
    try {
      const { data } = await client.post('/api/links', values);
      dispatch({ type: 'LINK_CREATED', payload: data.msg });
    } catch (error) {
      console.log(error);
    }
  };
  const resetState = () => {
    dispatch({ type: 'RESET_STATE', payload: initialState });
  };
  const addPassword = (password) => {
    dispatch({ type: 'ADD_PASSWORD', payload: password });
  };
  const setDownloads = (limit) => {
    dispatch({ type: 'SET_DOWNLOADS', payload: limit });
  };
  return (
    <appContext.Provider
      value={{
        message,
        original_name,
        name,
        loading,
        downloads,
        password,
        author,
        url,
        showAlert,
        uploadFile,
        createLink,
        resetState,
        addPassword,
        setDownloads,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
