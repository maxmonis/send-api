import React from 'react';
import appContext from './appContext';
import appReducer from './appReducer';

const AppState = ({ children }) => {
  return <appContext.Provider value={{}}>{children}</appContext.Provider>
};

export default AppState;
